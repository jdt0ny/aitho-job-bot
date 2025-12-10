import { createCanvas, loadImage } from "canvas";
import * as fs from "fs";
import * as path from "path";
import { config } from "../config";

export async function generateHiringImage(name = "Antonino Russo"): Promise<string> {
  const dir = path.resolve(config.outputDir);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const w = 900, h = 500;
  const canvas = createCanvas(w, h);
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
