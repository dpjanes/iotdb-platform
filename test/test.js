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
const path = require("path"); 

const platform = require("..")

describe("test", function() {
    const os_release = platform.initialize.shims.os_release;

    describe("data/os-release/raspberrypi-stretch", function() {
        before(function() {
            platform.initialize.shims.os_release = path.join(__dirname, "data/os-release/raspberrypi-stretch");
        })
        after(function() {
            platform.initialize.shims.os_release = os_release;
        })

        it("works", function(done) {
            _.promise.make()
                .then(platform.initialize)
                .then(_.promise.make(sd => {
                    assert.ok(platform.test("is_raspbian_stretch")(sd))
                    assert.ok(platform.test("is_raspbian")(sd))
                    assert.ok(platform.test("is_debian")(sd))
                    assert.ok(!platform.test("XXX")(sd))

                    assert.ok(platform.test("os_name", "Raspbian GNU/Linux 9 (stretch)")(sd))
                    assert.ok(!platform.test("os_name", "XXX")(sd))

                    done()
                }))
                .catch(done)
        })
    })
})
