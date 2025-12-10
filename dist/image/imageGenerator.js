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
exports.generateHiringImage = generateHiringImage;
const canvas_1 = require("canvas");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const config_1 = require("../config");
async function generateHiringImage(name = "Antonino Russo") {
    const dir = path.resolve(config_1.config.outputDir);
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir, { recursive: true });
    const w = 900, h = 500;
    const canvas = (0, canvas_1.createCanvas)(w, h);
    const ctx = canvas.getContext("2d");
    // background
    ctx.fillStyle = "#0f1724";
    ctx.fillRect(0, 0, w, h);
    // title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px Sans";
    ctx.fillText("Allora!", 40, 120);
    ctx.font = "36px Sans";
    ctx.fillStyle = "#ffdd57";
    ctx.fillText("Ci vediamo in ufficio?", 40, 200);
    ctx.font = "32px Sans";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Assunto? 😏", 40, 270);
    // small signature
    ctx.font = "20px Sans";
    ctx.fillStyle = "#9aa4b2";
    ctx.fillText(`- ${name}`, 40, 340);
    const outFile = path.join(dir, `invite-${Date.now()}.png`);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outFile, buffer);
    return outFile;
}
