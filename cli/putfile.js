#!/usr/bin/env node

var oss = require('../lib/oss');
var args = require('../lib/args');
var path = require('path');

console.error = function () { }

var argMap = args(process.argv.slice(2));

(async () => {
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
local
    必填，本地文件路径
remote    
    必填，远程文件路径`)
        return
    }
    var { region, accessKeyId, accessKeySecret, bucket, local, remote } = argMap
    var client = oss.instance({ region, accessKeyId, accessKeySecret, bucket });

    var r = await oss.put(client, local, remote);
    if (r) {
        console.log(0);
    } else {
        console.log(1);
    }
    console.log(`${r}: ${remote}`)
})()