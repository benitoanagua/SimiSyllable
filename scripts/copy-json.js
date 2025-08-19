import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Crear directorio dist/data si no existe
const distDataDir = join(__dirname, "..", "dist", "data");
if (!existsSync(distDataDir)) {
  mkdirSync(distDataDir, { recursive: true });
}

// Copiar archivos JSON de src/data a dist/data
const filesToCopy = ["en-dict.json", "es-dict.json"];

for (const file of filesToCopy) {
  const source = join(__dirname, "..", "src", "data", file);
  const destination = join(distDataDir, file);

  if (existsSync(source)) {
    copyFileSync(source, destination);
    console.log(`Copied ${file} to dist/data/`);
  } else {
    console.warn(`File ${file} not found in src/data/`);
  }
}
