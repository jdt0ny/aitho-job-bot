import { runAnalysis } from "./analysis/analyzer";
import { saveJsonReport } from "./report/reportBuilder";
import { buildPdfSummary } from "./report/reportFormatter";
import { logger } from "./core/logger";

async function main() {
  try {
    logger.info("Starting analysis...");
    const analysisResult = await runAnalysis();
    logger.info("Analysis finished.");

    const jsonReportPath = saveJsonReport(analysisResult);
    logger.info(`JSON report saved at: ${jsonReportPath}`);

    const pdfSummaryPath = buildPdfSummary(analysisResult);
    logger.info(`PDF summary saved at: ${pdfSummaryPath}`);

    logger.info("Process finished successfully.");
  } catch (error) {
    logger.error("An error occurred during the process:", error);
    process.exit(1);
  }
}

main();
