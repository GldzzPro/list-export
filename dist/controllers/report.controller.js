"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportQuerySchema = void 0;
exports.getReport = getReport;
const Report_model_1 = require("../models/Report.model");
const pdf_service_1 = require("../services/pdf.service");
const typebox_1 = require("@sinclair/typebox");
exports.reportQuerySchema = typebox_1.Type.Object({
    format: typebox_1.Type.Union([typebox_1.Type.Literal("pdf"), typebox_1.Type.Literal("excel")]),
    template: typebox_1.Type.String(),
    filter: typebox_1.Type.Optional(typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Any())),
});
async function getReport(request, reply) {
    try {
        const { format, template, filter = {} } = request.query;
        // Fetch data from MongoDB
        const data = await Report_model_1.Report.find(filter);
        if (format === "pdf") {
            const pdfBuffer = await (0, pdf_service_1.generatePDF)(data, template);
            reply
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=report.pdf")
                .send(pdfBuffer);
        }
        else {
            throw new Error("pdf generation is only implemented yet");
            // const excelBuffer = await generateExcel(data);
            // reply
            //   .header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            //   .header('Content-Disposition', 'attachment; filename=report.xlsx')
            //   .send(excelBuffer);
        }
    }
    catch (error) {
        reply.code(500).send({ error: "Internal Server Error" });
    }
}
