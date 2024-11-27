"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerQueryProcessors = registerQueryProcessors;
const typebox_1 = require("@sinclair/typebox");
const query_types_1 = require("../types/query.types");
const query_processor_1 = require("../processors/query.processor");
const pdf_service_1 = require("../services/pdf.service");
const excel_service_1 = require("../services/excel.service");
async function registerQueryProcessors(fastify) {
    fastify.post('/:collection', {
        schema: {
            tags: ['Query Processing'],
            params: typebox_1.Type.Object({
                collection: typebox_1.Type.String()
            }),
            body: query_types_1.RequestBodySchema,
            response: {
                200: typebox_1.Type.Object({
                    success: typebox_1.Type.Boolean(),
                    data: typebox_1.Type.Array(typebox_1.Type.Any())
                }),
                500: typebox_1.Type.Object({
                    error: typebox_1.Type.String(),
                    details: typebox_1.Type.Optional(typebox_1.Type.String()),
                    collection: typebox_1.Type.String()
                })
            }
        },
        handler: async (request, reply) => {
            const { collection } = request.params;
            const { query, format, templateLink } = request.body;
            try {
                const processor = new query_processor_1.QueryProcessor(fastify.db.collection(collection));
                const data = await processor.process(query);
                if (format === 'pdf') {
                    const pdfBuffer = await (0, pdf_service_1.generatePDF)(data, templateLink);
                    return reply
                        .header('Content-Type', 'application/pdf')
                        .header('Content-Disposition', `attachment; filename=${collection}-report.pdf`)
                        .send(pdfBuffer);
                }
                else {
                    const excelBuffer = await (0, excel_service_1.generateExcel)(data);
                    return reply
                        .header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        .header('Content-Disposition', `attachment; filename=${collection}-report.xlsx`)
                        .send(excelBuffer);
                }
            }
            catch (error) {
                return reply.code(500).send({
                    error: 'Query processing failed',
                    details: error.message,
                    collection
                });
            }
        }
    });
}
