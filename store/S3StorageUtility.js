"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageUtility = void 0;
const EnvironmentVariable_1 = require("./EnvironmentVariable");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const StorageUtility_1 = require("./StorageUtility");
class S3StorageUtility extends StorageUtility_1.StorageUtility {
    constructor(connection, bucket, accesskey, secretkey) {
        if (!connection || connection.trim().length == 0)
            connection = EnvironmentVariable_1.S3_STORAGE_REGION;
        if (!bucket || bucket.trim().length == 0)
            bucket = EnvironmentVariable_1.S3_STORAGE_BUCKET;
        super(connection, bucket);
        this.client = undefined;
        this.accessKey = EnvironmentVariable_1.S3_ACCESS_KEY;
        this.secretKey = EnvironmentVariable_1.S3_SECRET_KEY;
        if (accesskey && accesskey.trim().length > 0)
            this.accessKey = accesskey;
        if (secretkey && secretkey.trim().length > 0)
            this.secretKey = secretkey;
    }
    async getClient(regional = this.connection) {
        if (!this.client) {
            let credentials = undefined;
            if (this.accessKey && this.accessKey.trim().length > 0 && this.secretKey && this.secretKey.trim().length > 0) {
                credentials = { accessKeyId: this.accessKey, secretAccessKey: this.secretKey };
            }
            this.client = new client_s3_1.S3Client(credentials ? { region: regional, credentials } : { region: regional });
        }
        return this.client;
    }
    async listBucket() {
        const params = {};
        const command = new client_s3_1.ListBucketsCommand(params);
        const client = await this.getClient();
        return await client.send(command);
    }
    async listFile(folder, bucket = this.bucket) {
        const results = [];
        let data = await this.listFiles(folder, bucket);
        if (data.Contents && Array.isArray(data.Contents)) {
            for (let content of data.Contents) {
                if (content.Key)
                    results.push(content.Key);
            }
        }
        return results;
    }
    async listFiles(folder, bucket = this.bucket) {
        const params = folder && folder.trim().length > 0 ? { Bucket: bucket, Prefix: folder } : { Bucket: bucket };
        const command = new client_s3_1.ListObjectsV2Command(params);
        const client = await this.getClient();
        return await client.send(command);
    }
    async uploadFile(file, key = (0, uuid_1.v4)(), bucket = this.bucket) {
        let stream;
        if (typeof file === 'string') {
            stream = fs_1.default.createReadStream(file);
        }
        else {
            stream = file;
        }
        const params = {
            Bucket: bucket,
            Key: key,
            Body: stream,
        };
        const command = new client_s3_1.PutObjectCommand(params);
        const client = await this.getClient();
        let data = await client.send(command);
        return [key, data];
    }
    async downloadFile(key, file, bucket = this.bucket) {
        const params = {
            Bucket: bucket,
            Key: key,
        };
        const command = new client_s3_1.GetObjectCommand(params);
        const client = await this.getClient();
        const data = await client.send(command);
        if (file) {
            let stream;
            if (typeof file === 'string') {
                stream = fs_1.default.createWriteStream(file);
            }
            else {
                stream = file;
            }
            if (data.Body) {
                data.Body.pipe(stream);
            }
        }
        return data;
    }
    async deleteFile(key, bucket = this.bucket) {
        const params = {
            Bucket: bucket,
            Key: key,
        };
        const command = new client_s3_1.DeleteObjectCommand(params);
        const client = await this.getClient();
        return await client.send(command);
    }
    async moveFile(source, target, bucket = this.bucket) {
        const params = {
            Bucket: bucket,
            CopySource: `/${bucket}/${source}`, // need full path
            Key: target,
        };
        const command = new client_s3_1.CopyObjectCommand(params);
        const client = await this.getClient();
        await client.send(command);
        return await this.deleteFile(source, bucket);
    }
}
exports.S3StorageUtility = S3StorageUtility;
