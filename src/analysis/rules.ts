import { JobRaw, JobAnalysis } from "./types";
import axios from "axios";

/**
 * Basic rule checks:
 * - missing title
 * - missing link
 * - link not https
 * - link returns non-200
 * - short description missing
 */
export async function analyzeJob(job: JobRaw): Promise<JobAnalysis> {
  const issues: JobAnalysis["issues"] = [];

  if (!job.title || job.title.length < 3) {
    issues.push({ code: "missing_title", severity: "high", message: "Title missing or too short." });
  }

  if (!job.link) {
    issues.push({ code: "missing_link", severity: "medium", message: "No job link provided." });
  } else {
    if (!job.link.startsWith("https://")) {
      issues.push({ code: "link_not_https", severity: "high", message: "Job link is not HTTPS." });
    }

    // check link reachable (lightweight)
    try {
      const r = await axios.head(job.link, { timeout: 8000 });
      if (r.status >= 400) {
        issues.push({ code: "link_error_status", severity: "medium", message: `Link returns status ${r.status}` });
      }
    } catch (err) {
      issues.push({ code: "link_unreachable", severity: "medium", message: "Could not reach job link." });
    }
  }

  if (!job.snippet || job.snippet.length < 30) {
    issues.push({ code: "short_description", severity: "low", message: "Description appears short or missing." });
  }

  return { job, issues };
}
