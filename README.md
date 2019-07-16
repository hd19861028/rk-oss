# rk-oss

> rk-oss是一个命令行小工具库，专门用来对阿里云oss操作。目前封装了`oss-dir`和`oss-put`2个命令

# 安装Node.js

```javascript
sudo wget https://www.hjd86.cn/download/setup_node.sh 
sudo sh setup_node.sh "10.15.3"
```

# 安装rk-oss

```javascript
npm i -g win32-tools
```

# 基本命令行参数

* region
* accessKeyId
* accessKeySecret
* bucket

<h3>工具1：下载目录下全部文件</h3>

> 参数列表

* prefix
* output
* 基本命令行参数

```javascript
oss-dir prefix=log/2019/07/13/ output=/root/log/ region=xxx accessKeyId=xxx accessKeySecret=xxx bucket=xxx
```

<h3>工具2：单个文件上传</h3>

> 参数列表

* local
* remote
* 基本命令行参数

```javascript
oss-put local=/root/log/test.log remote=log/2019/07/13/test.log region=xxx accessKeyId=xxx accessKeySecret=xxx bucket=xxx
```
