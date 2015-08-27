/*
 * Splatoon.ink Test Server - This program simulates the Splatoon.ink API with
 * a shorter rotation time and random data.
 * Copyright (C) 2015  Baptiste Candellier
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var http = require('http');

var REFRESH_PERIOD_MS = 60000;

// Random stages
var maps = [
    {
        "nameJP": "ハコフグ倉庫",
        "nameEN": "Walleye Warehouse"
    },
    {
        "nameJP": "ホッケふ頭",
        "nameEN": "Port Mackerel"
    },
    {
        "nameJP": "アロワナモール",
        "nameEN": "Arowana Mall"
    },
    {
        "nameJP": "モンガラキャンプ場",
        "nameEN": "Camp Triggerfish"
    }
];

var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "application/json"});
    console.log("Sending fake data\n-------------------")

    // Response object
    var obj = {
        updateTime: (new Date()).getTime(),
        schedule: []
    };

    var initTime = (new Date()).getTime();

    // Write data to 3 schedule objects
    for(var i = 0; i < 3; i++) {
        obj.schedule[i] = {
            startTime: initTime + i * REFRESH_PERIOD_MS,
            endTime: (initTime + i * REFRESH_PERIOD_MS) + REFRESH_PERIOD_MS,
            "regular": {
                "maps": [
                    maps[Math.floor(Math.random() * maps.length)],
                    maps[Math.floor(Math.random() * maps.length)]
                ]
            },
            "ranked": {
                "maps": [
                    maps[Math.floor(Math.random() * maps.length)],
                    maps[Math.floor(Math.random() * maps.length)]
                ],
                "rulesJP": "ガチホコ",
                "rulesEN": "Rainmaker"
            }
        }

        console.log(JSON.stringify(obj.schedule[i].regular.maps, null, 2));
        initTime += REFRESH_PERIOD_MS;
    }

    response.end(JSON.stringify(obj) + "\n");
});

server.listen(8080);
console.log("Server running on port 8080");
