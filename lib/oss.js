
const OSS = require('ali-oss');


module.exports = {
    instance: ({ region, accessKeyId, accessKeySecret, bucket }) => {
        var client = new OSS({ region, accessKeyId, accessKeySecret, bucket, secure: false, timeout: 600 * 1000 });
        return client;
    },
    get: async function get(client, remoteFile, localFile) {
        try {
            let result = await client.get(remoteFile, localFile);
            return result.res.status == 200
        } catch (e) {
            console.log(e);
        }
    },
    put: async function (client, localFile, remoteFile) {
        try {
            var checkpoint;
            let success = true;
            var result = null;

            for (let i = 0; i < 5; i++) {
                try {
                    result = await client.multipartUpload(remoteFile, localFile, {
                        checkpoint,
                        async progress(percentage, cpt) {
                            checkpoint = cpt;
                        },
                    });
                    success = true;
                    break; // break if success
                } catch (e) {
                    console.log(e.message)
                    success = false;
                }
            }

            return success;
        } catch (error) {
            console.log(error)
            return false;
        }
    },
}