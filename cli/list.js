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
        var { region, accessKeyId, accessKeySecret, bucket, prefix, limit, search } = argMap
        var client = oss.instance({ region, accessKeyId, accessKeySecret, bucket });

        if (limit === undefined) limit = 1000;
        else limit = ~~limit

        let result = await client.list({ prefix, delimiter: '/', "max-keys": limit });
        var total = result.objects.length;
        var output = []
        for (var i = 0; i < result.objects.length; i++) {
            var file = result.objects[i];
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
        output.sort((a, b) => {
            if(a.lastModified>b.lastModified) return 1
            else return -1
        })
        console.table(output)
    } catch (error) {
        console.log(error)
    }
})()