/**
 *  test/initialize.js
 *
 *  David Janes
 *  IOTDB.org
 *  2017-12-11
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

const platform = require("..")

describe("initialize", function() {
    it("works", function(done) {
        _.promise.make()
            .then(platform.initialize)
            .then(_.promise.make(sd => {
                assert.ok(sd.platform)
                assert.ok(sd.platform.hostname)
                assert.ok(sd.platform.mac)
                done()
            }))
            .catch(done)
    })
})


/*
// exports.shims.os_release = "os-release";
_.promise.make()
    .then(initialize)
    .then(_.promise.log(null, "platform"))
    .catch(x => {
        console.log(x)
    })
    */
