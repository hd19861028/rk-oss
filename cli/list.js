#!/usr/bin/env node

require('../lib/prototype/index.js')
var oss = require('../lib/oss');
var args = require('../lib/args');
var path = require('path');
var fs = require('fs').promises;

console.error = function () { }

var argMap = args(process.argv.slice(2));

(async () => {
    try {
        var { region, accessKeyId, accessKeySecret, bucket, prefix, limit, search, marker, format } = argMap
        console.log(`当前参数\n${JSON.stringify({ region, bucket, prefix, limit, marker }, null, 4)}`)
        var client = oss.instance({ region, accessKeyId, accessKeySecret, bucket });

        format = format || "json"

        if (limit === undefined) limit = 1000;
        else limit = ~~limit

        let result = await client.list({ prefix, delimiter: '/', "max-keys": limit, marker });
        var { nextMarker, objects, } = result
        console.log(`nextMarker = ${nextMarker}`)
        var total = objects.length;
        console.log(`total = ${total}`)
        var output = []
        for (var i = 0; i < objects.length; i++) {
            var file = objects[i];
            var { lastModified, name, size, } = file
            name = name.replace(prefix, '')
            if (search) {
                if (name.indexOf(search) == -1) continue
            }
            lastModified = new Date(lastModified).Format('yyyy-MM-dd HH:mm:ss');
            size = size.FileSize()

            output.push({ lastModified, name, size })
            // console.log(`${i + 1}/${total}: `, { lastModified, name, size })
        }
        if (format == "table") {
            output.sort((a, b) => {
                if (a.lastModified > b.lastModified) return 1
                else return -1
            })
            console.table(output)
        }
        if (format == "json") {
            output = output.map(o => `${prefix}${o.name}`)
            console.log(JSON.stringify({ nextMarker, files: output }, null, 4))
        }

    } catch (error) {
        console.log(error)
    }
})()