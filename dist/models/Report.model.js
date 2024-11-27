"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ReportSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    data: { type: mongoose_1.default.Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.Report = mongoose_1.default.model('Report', ReportSchema);
