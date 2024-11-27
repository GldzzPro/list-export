"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRoutes = reportRoutes;
const report_controller_1 = require("../controllers/report.controller");
async function reportRoutes(fastify) {
    fastify.get('/', {
        schema: {
            querystring: report_controller_1.reportQuerySchema,
        },
        handler: report_controller_1.getReport,
    });
}
