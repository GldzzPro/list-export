"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBodySchema = exports.MongoQuerySchema = void 0;
const typebox_1 = require("@sinclair/typebox");
// Base query structure for MongoDB operations
exports.MongoQuerySchema = typebox_1.Type.Object({
    operation: typebox_1.Type.Union([
        typebox_1.Type.Literal('find'),
        typebox_1.Type.Literal('aggregate'),
        typebox_1.Type.Literal('lookup')
    ]),
    filters: typebox_1.Type.Optional(typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Any())),
    pipeline: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Any()))),
    sort: typebox_1.Type.Optional(typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Number())),
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
    skip: typebox_1.Type.Optional(typebox_1.Type.Number()),
    projection: typebox_1.Type.Optional(typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Number()))
});
// Request body schema
exports.RequestBodySchema = typebox_1.Type.Object({
    query: exports.MongoQuerySchema,
    format: typebox_1.Type.Union([typebox_1.Type.Literal('pdf'), typebox_1.Type.Literal('excel')]),
    templateLink: typebox_1.Type.String()
});
