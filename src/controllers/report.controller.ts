import { FastifyReply, FastifyRequest } from 'fastify';
import { Report } from '../models/Report.model';
import { generatePDF } from '../services/pdf.service';
import { generateExcel } from '../services/excel.service';
import { Type } from '@sinclair/typebox';

export const reportQuerySchema = Type.Object({
  format: Type.Union([Type.Literal('pdf'), Type.Literal('excel')]),
  template: Type.String(),
  filter: Type.Optional(Type.Record(Type.String(), Type.Any())),
});

export async function getReport(
  request: FastifyRequest<{ Querystring: typeof reportQuerySchema.static }>,
  reply: FastifyReply
) {
  try {
    const { format, template, filter = {} } = request.query;
    
    // Fetch data from MongoDB
    const data = await Report.find(filter);

    if (format === 'pdf') {
      const pdfBuffer = await generatePDF(data, template);
      reply
        .header('Content-Type', 'application/pdf')
        .header('Content-Disposition', 'attachment; filename=report.pdf')
        .send(pdfBuffer);
    } else {
      const excelBuffer = await generateExcel(data);
      reply
        .header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .header('Content-Disposition', 'attachment; filename=report.xlsx')
        .send(excelBuffer);
    }
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
}