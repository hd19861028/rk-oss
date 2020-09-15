#!/usr/bin/env node

var oss = require('../lib/oss');
var args = require('../lib/args');
var path = require('path');
var fs = require('fs').promises;

console.error = function () { }

var argMap = args(process.argv.slice(2));

(async () => {
    try {
        if (argMap['-h'] !== undefined || argMap['--help'] !== undefined) {
            console.log(`oss-dir：下载目录下所有文件
            
region
        必填，oss区域
accessKeyId
        必填，oss key
accessKeySecret
        必填，oss key对应的秘钥
bucket
        必填
prefix
        可选，列举哪个目录下的文件
limit    
        可选，列举文件上限，1~1000
output
        必填，文件下载到哪个目录，可以用相对目录。例如./dist/`)
            return
        }
        var { region, accessKeyId, accessKeySecret, bucket, prefix, output, limit } = argMap
        var client = oss.instance({ region, accessKeyId, accessKeySecret, bucket });
        if (!path.isAbsolute(output)) {
            output = path.resolve(process.cwd(), output)
        }
        if (limit === undefined) limit = 1000;
        else limit = ~~limit

        let objects = [];

        let result = await client.list({ prefix, delimiter: '/', "max-keys": limit });
        objects = [].concat(result.objects);
        while (result.nextMarker != null) {
            result = await client.list({ prefix, delimiter: '/', "max-keys": limit, marker: result.nextMarker });
            objects = objects.concat(result.objects);
        }
        var total = objects.length;
        console.log(`total = ${total}`)

        for (var i = 0; i < objects.length; i++) {
            var file = objects[i];
            var remoteFile = file.name;
            var basename = path.basename(remoteFile);
            var localFile = path.resolve(output, basename)
            var r = await oss.get(client, remoteFile, localFile);
            console.log(`${i + 1}/${total}: ${localFile}`)
        }
    } catch (error) {
        console.log(error)
    }
})()