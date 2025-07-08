"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageFactory = void 0;
class StorageFactory {
    static getStorage(type = "S3") {
        if (type == "S3") {
            const storage = require("./S3Storage");
            return new storage();
        }
        else if (type == "AZURE") {
            const storage = require("./AzureStorage");
            return new storage();
        }
        return undefined;
    }
}
exports.StorageFactory = StorageFactory;
