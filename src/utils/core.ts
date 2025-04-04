import fs from "fs/promises";
import path from "path";
import UploadService from "../services/upload";

const UPLOADS_DIR = path.resolve(process.cwd(), "uploads");

export const generateRadomDigits = (length: number) => {
  const digits = "0123456789";
  let result = "";

  const run = () => {
    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * digits.length);
      result = result + digits[index];
    }
  };
  run();

  if (result.length == 0) {
    generateRadomDigits(6);
  }

  return result;
};

export function generateFileName(filename: string): string {
  const randomSixDigitNumber = Math.floor(Math.random() * 900000) + 100000;
  return `${randomSixDigitNumber}-${filename}`;
}

export async function readFileBuffer(filename: string): Promise<Buffer> {
  const filePath = path.join(UPLOADS_DIR, filename);
  return fs.readFile(filePath);
}

export async function removeLocalFile(filename: string): Promise<void> {
  const filePath = path.join(UPLOADS_DIR, filename);
  await fs.rm(filePath);
}

export async function processFileUploads(
  files: any,
  uploadService: UploadService
) {
  const urls: string[] = [];

  for (const fileKey of Object.keys(files)) {
    for (const file of files[fileKey]) {
      const fileBuffer = await readFileBuffer(file.filename);
      const filePath = path.join(UPLOADS_DIR, file.filename);

      const url = await uploadService.uploadFile({
        content: fileBuffer,
        path: filePath,
      });

      urls.push(url);

      await removeLocalFile(file.filename);
    }
  }

  return urls;
}
