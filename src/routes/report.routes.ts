import { FastifyInstance } from 'fastify';
import { getReport, reportQuerySchema } from '../controllers/report.controller';

export async function reportRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      querystring: reportQuerySchema,
    },
    handler: getReport,
  });
}