import * as fs from "fs";
import * as path from "path";
import { config } from "../config";

export function saveJsonReport(payload: any, outPath?: string) {
  const dir = path.resolve(config.outputDir);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = outPath ?? path.join(dir, `report-${Date.now()}.json`);
  fs.writeFileSync(file, JSON.stringify(payload, null, 2), "utf-8");
  return file;
}
