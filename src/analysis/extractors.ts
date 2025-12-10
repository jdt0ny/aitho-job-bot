import * as cheerio from "cheerio";
import { JobRaw } from "./types";

/**
 * Simple extractor for TeamTailor job listings list page.
 * Keeps it conservative: extracts title + link + snippet if present.
 */
export function extractJobsFromHtml(html: string): JobRaw[] {
  const $ = cheerio.load(html);
  const jobs: JobRaw[] = [];

  // TeamTailor job cards usually have "h3" or "a" with job title — we try safe selectors.
  $("a[href*='/jobs/'], h3").each((i, el) => {
    const anchor = $(el).is("a") ? $(el) : $(el).find("a").first();
    const title = anchor.text().trim() || $(el).text().trim();
    const link = anchor.attr("href");
    const snippet = $(el).closest(".job").find(".job__description, .excerpt, p").first().text().trim() || undefined;
    if (title) {
      jobs.push({
        title,
        link: link ? (link.startsWith("http") ? link : `https://aitho.teamtailor.com${link}`) : undefined,
        snippet
      });
    }
  });

  // fallback: any h3 text not caught
  if (jobs.length === 0) {
    $("h3").each((i, el) => {
      const t = $(el).text().trim();
      if (t) jobs.push({ title: t });
    });
  }

  return jobs;
}
