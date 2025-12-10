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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPdfSummary = buildPdfSummary;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const config_1 = require("../config");
function buildPdfSummary(reportObj) {
    const dir = path.resolve(config_1.config.outputDir);
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `summary-${Date.now()}.pdf`);
    const doc = new pdfkit_1.default();
    doc.pipe(fs.createWriteStream(file));
    doc.fontSize(18).text(config_1.config.projectName, { underline: true });
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
        a.issues.forEach((iss) => {
            doc.fontSize(10).list([`${iss.severity.toUpperCase()} - ${iss.message}`]);
        });
        doc.moveDown();
    }
    doc.end();
    return file;
}
