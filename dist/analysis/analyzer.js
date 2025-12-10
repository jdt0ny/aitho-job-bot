"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAnalysis = runAnalysis;
const http_1 = require("../core/http");
const extractors_1 = require("./extractors");
const rules_1 = require("./rules");
const config_1 = require("../config");
const logger_1 = require("../core/logger");
async function runAnalysis() {
    logger_1.logger.info("Fetching jobs page:", config_1.config.jobsUrl);
    const html = await (0, http_1.fetchHtml)(config_1.config.jobsUrl);
    const rawJobs = (0, extractors_1.extractJobsFromHtml)(html);
    logger_1.logger.info(`Extracted ${rawJobs.length} jobs (raw).`);
    const analyses = [];
    for (const j of rawJobs) {
        const a = await (0, rules_1.analyzeJob)(j);
        analyses.push(a);
    }
    // build simple summary
    const total = analyses.length;
    const issuesCount = analyses.reduce((acc, a) => acc + a.issues.length, 0);
    const high = analyses.reduce((acc, a) => acc + a.issues.filter(i => i.severity === "high").length, 0);
    const summary = { totalJobs: total, totalIssues: issuesCount, highSeverity: high, generatedAt: new Date().toISOString() };
    return { summary, jobs: analyses };
}
