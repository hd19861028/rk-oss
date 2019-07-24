#!/usr/bin/env node

var oss = require('../lib/oss');
var args = require('../lib/args');
var path = require('path');

console.error = function () { }

var argMap = args(process.argv.slice(2));

(async () => {
    var { region, accessKeyId, accessKeySecret, bucket, local, remote } = argMap
    var client = oss.instance({ region, accessKeyId, accessKeySecret, bucket });

    var r = await oss.put(client, local, remote);
    if (r) {
        console.log(0);
        process.exit(0);
    } else {
        console.log(1);
        process.exit(1);
    }
    console.log(`${r}: ${remote}`)
})()