import PDFDocument from "pdfkit";
import * as fs from "fs";
import * as path from "path";
import { config } from "../config";

export function buildPdfSummary(reportObj: any): string {
  const dir = path.resolve(config.outputDir);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `summary-${Date.now()}.pdf`);
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(file));

  doc.fontSize(18).text(config.projectName, { underline: true });
  doc.moveDown();
  doc.fontSize(12).text(`Generated at: ${reportObj.summary.generatedAt}`);
  doc.moveDown();

  doc.text(`Total Jobs: ${reportObj.summary.totalJobs}`);
  doc.text(`Total Issues: ${reportObj.summary.totalIssues}`);
  doc.text(`High severity: ${reportObj.summary.highSeverity}`);
  doc.moveDown();

  doc.text("Top issues per job (first 10):");
  doc.moveDown();

  for (let i = 0; i < Math.min(10, reportObj.jobs.length); i++) {
    const a = reportObj.jobs[i];
    doc.fontSize(11).text(`${i + 1}. ${a.job.title}`);
    a.issues.forEach((iss: any) => {
      doc.fontSize(10).list([`${iss.severity.toUpperCase()} - ${iss.message}`]);
    });
    doc.moveDown();
  }

  doc.end();
  return file;
}
