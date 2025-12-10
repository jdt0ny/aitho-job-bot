"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const analyzer_1 = require("./analysis/analyzer");
const reportBuilder_1 = require("./report/reportBuilder");
const reportFormatter_1 = require("./report/reportFormatter");
const logger_1 = require("./core/logger");
async function main() {
    try {
        logger_1.logger.info("Starting analysis...");
        const analysisResult = await (0, analyzer_1.runAnalysis)();
        logger_1.logger.info("Analysis finished.");
        const jsonReportPath = (0, reportBuilder_1.saveJsonReport)(analysisResult);
        logger_1.logger.info(`JSON report saved at: ${jsonReportPath}`);
        const pdfSummaryPath = (0, reportFormatter_1.buildPdfSummary)(analysisResult);
        logger_1.logger.info(`PDF summary saved at: ${pdfSummaryPath}`);
        logger_1.logger.info("Process finished successfully.");
    }
    catch (error) {
        logger_1.logger.error("An error occurred during the process:", error);
        process.exit(1);
    }
}
main();
