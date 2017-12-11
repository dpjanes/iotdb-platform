/**
 *  lib/initialize.js
 *
 *  David Janes
 *  IOTDB.org
 *  2017-11-23
 *
 *  Copyright [2013-2018] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

const _ = require("iotdb-helpers");
const fs = require("iotdb-fs");

const assert = require("assert"); 
const os = require("os"); 

/**
 */
const _make_platform = _.promise.make(self => {
    self.platform = {
        "@timestamp": _.timestamp.make(),
        username: os.userInfo().username,
        hostname: os.hostname().toLowerCase(),
        arch: os.arch(),
        platform: os.platform(),
    };
})

/**
 */
const _add_network = _.promise.make(self => {
    const mac = _.net.mac();
    if (mac) {
        self.platform.mac = mac;
    }
})

/**
 */
const _add_os_release = _.promise.make((self, done) => {
    _.promise.make(self)
        .then(fs.read.p(exports.initialize.shims.os_release, "utf-8", ""))
        .then(_.promise.make(sd => {
            sd.document.split("\n")
                .map(line => line.match(/^(.*)="?(.*?)"?$/))
                .filter(match => match)
                .forEach(match => {
                    switch (match[1]) {
                    case "ID":
                    case "ID_LIKE":
                        self.platform[`is_${match[2]}`] = true
                        break;

                    case "PRETTY_NAME":
                        self.platform.os_name = match[2];

                        switch (match[2]) {
                        case "Raspbian GNU/Linux 9 (stretch)":
                            self.platform["is_raspbian_stretch"] = true;
                            break;
                        }

                    }
                })
        }))
        .then(_.promise.done(done, self, "platform"))
        .catch(done)
})

/**
 *  Return a "platform" of the current running machine.
 *  Ideally we'd find some way to return a unique
 *  ID for this machine, a work in progress.
 */
const initialize = _.promise.make((self, done) => {
    const method = "initialize";

    _.promise.make(self)
        .then(_make_platform)
        .then(_add_network)
        .then(_add_os_release)
        .then(_.promise.done(done, self, "platform"))
        .catch(done)
});

/**
 *  API
 */
exports.initialize = initialize;
exports.initialize.shims = {
    os_release: "/etc/os-release",
}
