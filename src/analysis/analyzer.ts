import { fetchHtml } from "../core/http";
import { extractJobsFromHtml } from "./extractors";
import { analyzeJob } from "./rules";
import { JobAnalysis } from "./types";
import { config } from "../config";
import { logger } from "../core/logger";

export async function runAnalysis(): Promise<{ summary: any; jobs: JobAnalysis[] }> {
  logger.info("Fetching jobs page:", config.jobsUrl);
  const html = await fetchHtml(config.jobsUrl);

  const rawJobs = extractJobsFromHtml(html);
  logger.info(`Extracted ${rawJobs.length} jobs (raw).`);

  const analyses: JobAnalysis[] = [];
  for (const j of rawJobs) {
    const a = await analyzeJob(j);
    analyses.push(a);
  }

  // build simple summary
  const total = analyses.length;
  const issuesCount = analyses.reduce((acc, a) => acc + a.issues.length, 0);
  const high = analyses.reduce((acc, a) => acc + a.issues.filter(i => i.severity === "high").length, 0);

  const summary = { totalJobs: total, totalIssues: issuesCount, highSeverity: high, generatedAt: new Date().toISOString() };

  return { summary, jobs: analyses };
}
