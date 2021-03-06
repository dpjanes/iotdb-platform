/**
 *  lib/test.js
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

const assert = require("assert"); 

/**
 *  A helper function for doing this sort of thing:
 *
 *      .then(_.promise.conditional(platform.test("is_raspbian"), is_raspbian_code))
 */
const test = (key, ...rest) => self => {
    const method = "test";

    if (rest.length === 0) {
        return self.platform[key] ? true : false;
    } else {
        return self.platform[key] === rest[0] ? true : false;
    }
};

/**
 *  API
 */
exports.test = test;
