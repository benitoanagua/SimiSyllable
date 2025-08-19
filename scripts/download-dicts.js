import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { get } from "https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "..", "data");

// Crear directorio data si no existe
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Función para descargar y procesar CMU Dict
function downloadCmuDict() {
  return new Promise((resolve, reject) => {
    console.log("Downloading CMU dictionary...");

    get(
      "https://raw.githubusercontent.com/cmusphinx/cmudict/master/cmudict.dict",
      (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            console.log("Processing CMU dictionary...");
            const lines = data.split("\n");
            const processedDict = {};

            for (const line of lines) {
              if (line.startsWith(";") || !line.trim()) continue;

              const [word, ...phonemes] = line.split(" ");
              if (!word) continue;

              // Contar sílabas (fonemas con números indican sílabas acentuadas)
              const syllableCount = phonemes.filter((p) =>
                /[0-9]/.test(p)
              ).length;
              const cleanWord = word.toLowerCase().replace(/\([0-9]\)$/, "");

              processedDict[cleanWord] = syllableCount;
            }

            writeFileSync(
              join(dataDir, "cmudict-processed.json"),
              JSON.stringify(processedDict)
            );

            console.log("CMU dictionary processed successfully");
            resolve(true);
          } catch (error) {
            reject(error);
          }
        });
      }
    ).on("error", (error) => {
      console.warn("Failed to download CMU dictionary:", error.message);
      resolve(false); // No fallar completamente, usar algoritmo de respaldo
    });
  });
}

// Función para descargar y procesar diccionario español
function downloadSpanishDict() {
  return new Promise((resolve, reject) => {
    console.log("Downloading Spanish dictionary...");

    // Usar un diccionario español de sílabas (ejemplo con un recurso disponible)
    get(
      "https://raw.githubusercontent.com/titoBouzout/Dictionaries/master/Spanish.dic",
      (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            console.log("Processing Spanish dictionary...");
            const lines = data.split("\n");
            const processedDict = {};

            for (const line of lines) {
              if (!line.trim() || line.startsWith("#")) continue;

              const parts = line.split("/");
              const word = parts[0];
              if (!word) continue;

              // Contar sílabas basado en separadores
              const cleanWord = word
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z]/g, "");

              if (cleanWord) {
                // Si hay separadores de sílabas, contar por ellos
                if (parts.length > 1) {
                  processedDict[cleanWord] = parts.length - 1;
                } else {
                  // Si no hay separadores, usar algoritmo básico
                  const vowels = cleanWord.match(/[aeiou]/g);
                  processedDict[cleanWord] = vowels ? vowels.length : 1;
                }
              }
            }

            writeFileSync(
              join(dataDir, "es-dict-expanded.json"),
              JSON.stringify(processedDict)
            );

            console.log("Spanish dictionary processed successfully");
            resolve(true);
          } catch (error) {
            reject(error);
          }
        });
      }
    ).on("error", (error) => {
      console.warn("Failed to download Spanish dictionary:", error.message);
      resolve(false); // No fallar completamente, usar algoritmo de respaldo
    });
  });
}

// Ejecutar descargas
async function main() {
  try {
    await Promise.all([downloadCmuDict(), downloadSpanishDict()]);
    console.log("Dictionary download completed");
  } catch (error) {
    console.error("Error downloading dictionaries:", error);
    process.exit(1);
  }
}

// Ejecutar si es el script principal
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
