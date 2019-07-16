# win-tools

> win-tools是一个命令行小工具库，正在逐步增加新元素中...

# 安装

```javascript
npm i -g win32-tools
```

* [加解密测试工具](#sec)
* [多线程下载](#dl)
* [目录比较(diff)](#diff)
* [目录浏览(ll)](#ll)
* [7z压缩和解压缩](#7z)
* [文件md5](#md5)

<h3 name="sec">工具1：加解密测试工具</h3>

> 命令

```javascript
secret -h
```

> 输出

<pre>-m              加密方式: md5,sha1,sha256,sha512,rsa2
-pri            加密秘钥, -mac开启时, 此参数必须
-str            需要签名的字符串
-aes-method     对称加密方式, 例如: aes-128-ecb
-d              如果-aes-method参数存在，-d表示解密
-rsapri         ras私钥路径，默认值：~/.ssh/id_rsa
-rsapub         ras公钥路径，默认值：~/.ssh/id_rsa.pub
-result         返回值类型, hex或者base64, 默认hex

------------
如何使用RSA认证
------------
1. 生成公私钥
        私钥: openssl genrsa -out ~/.ssh/id_rsa 2048
        公钥: openssl rsa -in ~/.ssh/id_rsa -pubout -out ~/.ssh/id_rsa.pub
2. 利用私钥生成签名串
        secret -m=rsa2 -str=123456 -rsapri=./.ssh/id_rsa
3. 验签
        secret -m=rsa2 -str=123456 -rsapub=./.ssh/id_rsa.pub -pri=第二步返回的签名结果

------------
举例
------------
hmac sha1加密
        secret \
            -str=hujindi:1514861090328 \
            -result=hex \
            -pri=c561244e-d660-11e7-aaf8-d8a25e935567 \
            -m=sha1
aes对称加密
        secret \
            -str=Test_AES_String \
            -result=hex \
            -pri=2fe4a27ee9eb11e7 \
            -aes-method=aes-128-ecb
aes对称解密
        secret \
            -str=c8e8757bc9eba97898c5205443207b73 \
            -result=hex \
            -pri=2fe4a27ee9eb11e7 \
            -aes-method=aes-128-ecb \
            -d</pre>

<h3 name="dl">工具2：多线程下载</h3>

> 命令

```javascript
dl --help
```

> 输出

<pre>Node.js多线程下载

--------------------
参数说明
--------------------

-o              输出文件名
-u              下载文件路径
-h              请求头，可多次传入
-c              启动多少个线程，可不传，默认为cpu核数
-s              秒数。超过这个秒数则强行终止，默认为120秒

--------------------
示例
--------------------

dl http://dl.example.com/test.file

或者

dl -o=./test.file -u=http://dl.example.com/test.file -h='content-type:application/json'</pre>


<h3 name="diff">工具3：目录比较</h3>

> 命令

```javascript
diff f:\op f:\op1
```

> 输出

<pre>----------
仅存在  f:\op
----------
f:\op\1.txt

----------
仅存在  f:\op1
----------
f:\op1\2.txt

----------
有差异
----------
f:\op\run.bat</pre>


<h3 name="ll">工具4：目录打印</h3>

> 命令

```javascript
ll
// 列出当前文件夹内所有文件夹大小和文件个数

或者

ll db.js
// 列出当前文件夹内，文件名包含“db.js”的文件
```

> 输出

<pre>2019-07-05    09:57     717.25k         &lt;dir&gt;  .git
2019-07-05    08:31     1.11m           &lt;dir&gt;  bin
2019-07-05    10:30     11.41k          &lt;dir&gt;  cli
2019-07-05    10:33     12.44k          &lt;dir&gt;  lib
2019-07-05    11:00     90.12k          &lt;dir&gt;  node_modules
2019-07-05    08:31     52.00b                 .gitignore
2019-07-05    09:46     2.60k                  README.md
2019-07-05    08:31     91.00b                 common.js
2019-07-05    09:56     13.89k                 index.html
2019-07-05    11:00     1.86k                  package-lock.json
2019-07-05    11:00     613.00b                package.json</pre>


<h3 name="7z">工具5：压缩和解压</h3>

> 压缩

```javascript
zip ./

或者

zip ./ -o=test.7z
```

> 解压

```javascript
unzip test.7z

或者

unzip -o=d:\test test.7z
```


<h3 name="md5">工具6：查看文件MD5</h3>

> 命令

```javascript
md5 package.json common.js

或者

md5 package.json 123456
```

> 输出

<pre>123456    --md5-->    e10adc3949ba59abbe56e057f20f883e

common.js    4ms
    md5:   e10adc3949ba59abbe56e057f20f883e</pre>