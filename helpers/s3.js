const { S3Client } = require('@aws-sdk/client-s3');

const config = {
    region:'ap-south-1',
    credentials: {
        accessKeyId:"AKIA3FLD6FI4V6I4RXFU",
        secretAccessKey:"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",
        endpoint: "s3.ap-south-1.amazonaws.com"
    }
}
const s3 = new S3Client(config);

module.exports = s3;