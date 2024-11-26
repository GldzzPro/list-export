import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { RequestBodySchema } from '../types/query.types';
import { QueryProcessor } from '../processors/query.processor';
import { generatePDF } from '../services/pdf.service';
import { generateExcel } from '../services/excel.service';

export async function registerQueryProcessors(fastify: FastifyInstance) {
  fastify.post('/:collection', {
    schema: {
      tags: ['Query Processing'],
      params: Type.Object({
        collection: Type.String()
      }),
      body: RequestBodySchema,
      response: {
        200: Type.Object({
          success: Type.Boolean(),
          data: Type.Array(Type.Any())
        }),
        500: Type.Object({
          error: Type.String(),
          details: Type.Optional(Type.String()),
          collection: Type.String()
        })
      }
    },
    handler: async (request, reply) => {
      const { collection } = request.params;
      const { query, format, templateLink } = request.body;
      
      try {
        const processor = new QueryProcessor(fastify.db.collection(collection));
        const data = await processor.process(query);
        
        if (format === 'pdf') {
          const pdfBuffer = await generatePDF(data, templateLink);
          return reply
            .header('Content-Type', 'application/pdf')
            .header('Content-Disposition', `attachment; filename=${collection}-report.pdf`)
            .send(pdfBuffer);
        } else {
          const excelBuffer = await generateExcel(data);
          return reply
            .header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            .header('Content-Disposition', `attachment; filename=${collection}-report.xlsx`)
            .send(excelBuffer);
        }
      } catch (error) {
        return reply.code(500).send({ 
          error: 'Query processing failed', 
          details: error.message,
          collection 
        });
      }
    }
  });
}