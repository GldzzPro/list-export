import ExcelJS from 'exceljs';

export async function generateExcel(data: any[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Report');

  // Add headers
  if (data.length > 0) {
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);
  }

  // Add data rows
  data.forEach(item => {
    worksheet.addRow(Object.values(item));
  });

  return workbook.xlsx.writeBuffer();