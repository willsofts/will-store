import fs from "fs";
import { BlobServiceClient } from '@azure/storage-blob';
import { S3Client } from '@aws-sdk/client-s3';

export declare class AzureStorageUtility extends StorageUtility {
    private client;
    constructor(connection?: string, bucket?: string);
    getClient(connection?: string): Promise<BlobServiceClient>;
    listBucket(): Promise<any>;
    listFile(folder?: string, bucket?: string): Promise<string[]>;
    listFiles(folder?: string, bucket?: string): Promise<any>;
    uploadFile(file: string | fs.ReadStream, key?: string, bucket?: string): Promise<[string, any]>;
    downloadFile(key: string, file?: string | fs.WriteStream, bucket?: string): Promise<any>;
    deleteFile(key: string, bucket?: string): Promise<any>;
    moveFile(source: string, target: string, bucket?: string): Promise<any>;
}

export declare class S3StorageUtility extends StorageUtility {
    private client;
    accessKey: string;
    secretKey: string;
    constructor(connection?: string, bucket?: string, accesskey?: string, secretkey?: string);
    getClient(regional?: string): Promise<S3Client>;
    listBucket(): Promise<any>;
    listFile(folder?: string, bucket?: string): Promise<string[]>;
    listFiles(folder?: string, bucket?: string): Promise<any>;
    uploadFile(file: string | fs.ReadStream, key?: string, bucket?: string): Promise<[string, any]>;
    downloadFile(key: string, file?: string | fs.WriteStream, bucket?: string): Promise<any>;
    deleteFile(key: string, bucket?: string): Promise<any>;
    moveFile(source: string, target: string, bucket?: string): Promise<any>;
}

export declare class StorageFactory {
    static getStorage(type?: string): StorageInfo | undefined;
}

export declare class StorageUtility implements StorageInfo {
    connection: string;
    bucket: string;
    constructor(connection?: string, bucket?: string);
    listBucket(): Promise<any>;
    listFile(folder?: string, bucket?: string): Promise<string[]>;
    listFiles(folder?: string, bucket?: string): Promise<any>;
    uploadFile(file: string | fs.ReadStream, key?: string, bucket?: string): Promise<[string, any]>;
    downloadFile(key: string, file?: string | fs.WriteStream, bucket?: string): Promise<any>;
    deleteFile(key: string, bucket?: string): Promise<any>;
    moveFile(source: string, target: string, bucket?: string): Promise<any>;
}

export interface StorageInfo {
    connection: string;
    bucket: string;
    listBucket(): Promise<any>;
    listFile(folder?: string, bucket?: string): Promise<string[]>;
    listFiles(folder?: string, bucket?: string): Promise<any>;
    uploadFile(file: string | fs.ReadStream, key?: string, bucket?: string): Promise<[string, any]>;
    downloadFile(key: string, file?: string | fs.WriteStream, bucket?: string): Promise<any>;
    deleteFile(key: string, bucket?: string): Promise<any>;
    moveFile(source: string, target: string, bucket?: string): Promise<any>;
}
