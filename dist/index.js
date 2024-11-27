"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const database_1 = require("./config/database");
const routes_1 = require("./routes");
const server = (0, fastify_1.default)({
    logger: true,
}).withTypeProvider();
// Register plugins
server.register(cors_1.default);
server.register(swagger_1.default, {
    openapi: {
        info: {
            title: 'Query Processor API',
            version: '1.0.0',
        },
    },
    hideUntagged: true,
});
// Register routes
server.register(routes_1.registerQueryProcessors, { prefix: '/api/process' });
// Start server
const start = async () => {
    try {
        const db = await (0, database_1.connectDB)();
        // Add database instance to fastify for access in routes
        server.decorate('db', db);
        await server.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server running on port 3000');
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
