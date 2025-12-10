"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    jobsUrl: process.env.AITHO_JOBS_URL || "https://aitho.teamtailor.com/jobs",
    n8nWebhook: process.env.N8N_WEBHOOK || "",
    outputDir: process.env.OUTPUT_DIR || "./output",
    projectName: process.env.PROJECT_NAME || "Aitho Job Flow Health Checker",
    userAgent: "Aitho-Heath-Checker/1.0 (+tony)"
};
