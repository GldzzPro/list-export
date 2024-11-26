import { Type } from '@sinclair/typebox';

// Base query structure for MongoDB operations
export const MongoQuerySchema = Type.Object({
  operation: Type.Union([
    Type.Literal('find'),
    Type.Literal('aggregate'),
    Type.Literal('lookup')
  ]),
  filters: Type.Optional(Type.Record(Type.String(), Type.Any())),
  pipeline: Type.Optional(Type.Array(Type.Record(Type.String(), Type.Any()))),
  sort: Type.Optional(Type.Record(Type.String(), Type.Number())),
  limit: Type.Optional(Type.Number()),
  skip: Type.Optional(Type.Number()),
  projection: Type.Optional(Type.Record(Type.String(), Type.Number()))
});

// Request body schema
export const RequestBodySchema = Type.Object({
  query: MongoQuerySchema,
  format: Type.Union([Type.Literal('pdf'), Type.Literal('excel')]),
  templateLink: Type.String()
});