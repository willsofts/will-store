"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureStorageUtility = void 0;
const EnvironmentVariable_1 = require("./EnvironmentVariable");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const storage_blob_1 = require("@azure/storage-blob");
const StorageUtility_1 = require("./StorageUtility");
class AzureStorageUtility extends StorageUtility_1.StorageUtility {
    constructor(connection, bucket, endpoint) {
        if (!connection || connection.trim().length == 0)
            connection = EnvironmentVariable_1.AZURE_STORAGE_CONNECTION;
        if (!bucket || bucket.trim().length == 0)
            bucket = EnvironmentVariable_1.AZURE_STORAGE_BUCKET;
        super(connection, bucket, endpoint);
        this.client = undefined;
    }
    async getClient(connection = this.connection) {
        if (!this.client) {
            this.client = storage_blob_1.BlobServiceClient.fromConnectionString(connection);
        }
        return this.client;
    }
    async listBucket() {
        const client = await this.getClient();
        const containerNames = [];
        for await (const container of client.listContainers()) {
            containerNames.push(container.name);
        }
        return containerNames;
    }
    async listFile(folder, bucket = this.bucket) {
        const results = [];
        let data = await this.listFiles(folder, bucket);
        for await (const blob of data) {
            results.push(blob.name);
        }
        return results;
    }
    async listFiles(folder, bucket = this.bucket) {
        const client = await this.getClient();
        const containerClient = client.getContainerClient(bucket);
        let param = folder && folder.trim().length > 0 ? { prefix: folder } : undefined;
        return containerClient.listBlobsFlat(param);
    }
    async uploadFile(file, key = (0, uuid_1.v4)(), bucket = this.bucket) {
        let stream;
        if (typeof file === 'string') {
            stream = fs_1.default.createReadStream(file);
        }
        else {
            stream = file;
        }
        const client = await this.getClient();
        const containerClient = client.getContainerClient(bucket);
        await containerClient.createIfNotExists();
        const blockBlobClient = containerClient.getBlockBlobClient(key);
        const data = await blockBlobClient.uploadStream(stream);
        return [key, data];
    }
    async downloadFile(key, file, bucket = this.bucket) {
        const client = await this.getClient();
        const containerClient = client.getContainerClient(bucket);
        const blobClient = containerClient.getBlobClient(key);
        const data = await blobClient.download();
        if (file) {
            let stream;
            if (typeof file === 'string') {
                stream = fs_1.default.createWriteStream(file);
            }
            else {
                stream = file;
            }
            await new Promise((resolve, reject) => {
                data.readableStreamBody?.pipe(stream)
                    .on('finish', resolve)
                    .on('error', reject);
            });
        }
        return data;
    }
    async deleteFile(key, bucket = this.bucket) {
        const client = await this.getClient();
        const containerClient = client.getContainerClient(bucket);
        const blobClient = containerClient.getBlobClient(key);
        return await blobClient.delete();
    }
    async moveFile(source, target, bucket = this.bucket) {
        const client = await this.getClient();
        const containerClient = client.getContainerClient(bucket);
        const sourceBlobClient = containerClient.getBlobClient(source);
        const targetBlobClient = containerClient.getBlobClient(target);
        const copyPoller = await targetBlobClient.beginCopyFromURL(sourceBlobClient.url);
        await copyPoller.pollUntilDone();
        return await sourceBlobClient.delete();
    }
}
exports.AzureStorageUtility = AzureStorageUtility;
