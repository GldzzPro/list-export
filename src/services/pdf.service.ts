import axios from 'axios';

const PDF_SERVICE_URL = process.env.PDF_SERVICE_URL || 'http://pdf-service:3001/generate';

export async function generatePDF(data: any[], templateLink: string): Promise<Buffer> {
  try {
    const response = await axios.post(PDF_SERVICE_URL, {
      templateLink,
      data,
    }, {
      responseType: 'arraybuffer'
    });
    
    return Buffer.from(response.data);
  } catch (error) {
    throw new Error(`PDF generation failed: ${error.message}`);
  }
}