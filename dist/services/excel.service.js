"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExcel = generateExcel;
const exceljs_1 = __importDefault(require("exceljs"));
async function generateExcel(data) {
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet("Report");
    // Add headers
    if (data.length > 0) {
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers);
    }
    // Add data rows
    data.forEach((item) => {
        worksheet.addRow(Object.values(item));
    });
    return workbook.xlsx.writeBuffer();
}
