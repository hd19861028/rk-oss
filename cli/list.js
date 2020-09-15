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
        if (argMap['-h'] !== undefined || argMap['--help'] !== undefined) {
            console.log(`oss-list：列举所有文件

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
marker
        可选，每次列举完文件以后，命令行会输出nextMarker，下一次列举文件时，传入该参数，表示从该位置开始获取文件
format
        输出的格式。table | json。默认json。
search
        自定义的筛选条件。根据文件名过滤。不支持“*”通配符`)
            return
        }
        var { region, accessKeyId, accessKeySecret, bucket, prefix, limit, search, marker, format } = argMap
        console.log(`当前参数\n${JSON.stringify({ region, bucket, prefix, limit, marker }, null, 4)}`)
        var client = oss.instance({ region, accessKeyId, accessKeySecret, bucket });

        format = format || "json"

        if (limit === undefined) limit = 1000;
        else limit = ~~limit

        let result = await client.list({ prefix, delimiter: '/', "max-keys": limit, marker });
        var { nextMarker, objects, } = result
        var total = objects.length;
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
            console.log(`nextMarker = ${nextMarker}`)
            console.log(`total = ${total}`)
        }
        if (format == "json") {
            output = output.map(o => `${prefix}${o.name}`)
            console.log(JSON.stringify({ nextMarker, files: output }, null, 4))
        }

    } catch (error) {
        console.log(error)
    }
})()