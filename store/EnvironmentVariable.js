"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AZURE_STORAGE_BUCKET = exports.AZURE_STORAGE_CONNECTION = exports.S3_STORAGE_BUCKET = exports.S3_STORAGE_REGION = exports.S3_END_POINT = exports.S3_SECRET_KEY = exports.S3_ACCESS_KEY = void 0;
const will_util_1 = __importDefault(require("@willsofts/will-util"));
exports.S3_ACCESS_KEY = will_util_1.default.env("S3_ACCESS_KEY");
exports.S3_SECRET_KEY = will_util_1.default.env("S3_SECRET_KEY");
exports.S3_END_POINT = will_util_1.default.env("S3_END_POINT");
exports.S3_STORAGE_REGION = will_util_1.default.env("STORAGE_REGION", "ap-southeast-1");
exports.S3_STORAGE_BUCKET = will_util_1.default.env("STORAGE_BUCKET", "mdc-soc-dev");
exports.AZURE_STORAGE_CONNECTION = will_util_1.default.env("AZURE_STORAGE_CONNECTION", "");
exports.AZURE_STORAGE_BUCKET = will_util_1.default.env("AZURE_STORAGE_BUCKET", "dev-cloranc-blob");
