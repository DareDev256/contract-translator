import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function parseFile(
  buffer: Buffer,
  fileName: string
): Promise<string> {
  const ext = fileName.split(".").pop()?.toLowerCase();

  if (ext === "pdf") {
    const data = await pdf(buffer);
    return data.text.trim();
  }

  if (ext === "docx" || ext === "doc") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  if (ext === "txt") {
    return buffer.toString("utf-8").trim();
  }

  throw new Error(
    `Unsupported file type: .${ext}. Supported: PDF, DOCX, TXT`
  );
}
