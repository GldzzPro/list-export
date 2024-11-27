"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = generatePDF;
const axios_1 = __importDefault(require("axios"));
const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL || "http://localhost:3000/generate-pdf";
async function generatePDF(data, templateLink) {
    try {
        const response = await axios_1.default.post(PDF_SERVICE_URL, {
            templateLink,
            data,
        }, {
            responseType: "arraybuffer",
        });
        return Buffer.from(response.data);
    }
    catch (error) {
        throw new Error(`PDF generation failed: ${JSON.stringify(error)}`);
    }
}
