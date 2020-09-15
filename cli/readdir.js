#!/usr/bin/env node

var oss = require('../lib/oss');
var args = require('../lib/args');
var path = require('path');
var fs = require('fs').promises;

console.error = function () { }

var argMap = args(process.argv.slice(2));

(async () => {
    var { region, accessKeyId, accessKeySecret, bucket, prefix, output, limit, marker } = argMap
    var client = oss.instance({ region, accessKeyId, accessKeySecret, bucket });
    if (!path.isAbsolute(output)) {
        output = path.resolve(process.cwd(), output)
    }
    if(limit === undefined) limit = 1000;
    else limit = ~~limit

    let result = await client.list({ prefix, delimiter: '/', "max-keys": limit, marker });
    console.log(`nextMarker = ${result.nextMarker}`)
    var total = result.objects.length;
    console.log(`total = ${total}`)
    
    for (var i = 0; i < result.objects.length; i++) {
        var file = result.objects[i];
        var remoteFile = file.name;
        var basename = path.basename(remoteFile);
        var localFile = path.resolve(output, basename)
        var r = await oss.get(client, remoteFile, localFile);
        console.log(`${i+1}/${total}: ${localFile}`)
    }
})()