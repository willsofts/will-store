"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageUtility = void 0;
class StorageUtility {
    constructor(connection, bucket) {
        this.connection = "";
        this.bucket = "";
        if (connection)
            this.connection = connection;
        if (bucket)
            this.bucket = bucket;
    }
    async listBucket() {
        return undefined;
    }
    async listFile(folder, bucket = this.bucket) {
        return undefined;
    }
    async uploadFile(file, key = "", bucket = this.bucket) {
        return ["", undefined];
    }
    async downloadFile(key, file, bucket = this.bucket) {
        return undefined;
    }
    async deleteFile(key, bucket = this.bucket) {
        return undefined;
    }
    async moveFile(source, target, bucket = this.bucket) {
        return undefined;
    }
}
exports.StorageUtility = StorageUtility;
