"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJobsFromHtml = extractJobsFromHtml;
const cheerio = __importStar(require("cheerio"));
/**
 * Simple extractor for TeamTailor job listings list page.
 * Keeps it conservative: extracts title + link + snippet if present.
 */
function extractJobsFromHtml(html) {
    const $ = cheerio.load(html);
    const jobs = [];
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
            if (t)
                jobs.push({ title: t });
        });
    }
    return jobs;
}
