import fs from "fs";
import { BlobServiceClient } from '@azure/storage-blob';
import { S3Client } from '@aws-sdk/client-s3';

export declare class AzureStorageUtility {
    private client;
    connection: string;
    bucket: string;
    getClient(connection?: string): Promise<BlobServiceClient>;
    listBucket(client?: BlobServiceClient): Promise<any>;
    listFile(folder?: string, bucket?: string): Promise<any>;
    uploadFile(file: string | fs.ReadStream, key?: string, bucket?: string): Promise<[string, any]>;
    downloadFile(key: string, file?: string | fs.WriteStream, bucket?: string): Promise<any>;
    deleteFile(key: string, bucket?: string): Promise<any>;
    moveFile(source: string, target: string, bucket?: string): Promise<any>;
}

export declare class S3StorageUtility {
    private client;
    region: string;
    bucket: string;
    getClient(regional?: string): Promise<S3Client>;
    listBucket(): Promise<any>;
    listFile(folder?: string, bucket?: string): Promise<any>;
    uploadFile(file: string | fs.ReadStream, key?: string, bucket?: string): Promise<[string, any]>;
    downloadFile(key: string, file?: string | fs.WriteStream, bucket?: string): Promise<any>;
    deleteFile(key: string, bucket?: string): Promise<any>;
    moveFile(source: string, target: string, bucket?: string): Promise<any>;
}
