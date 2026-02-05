"use client";

import { useCallback, useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import type { UploadState } from "@/lib/types";

interface Props {
  onAnalyze: (formData: FormData) => void;
  state: UploadState;
}

export function UploadZone({ onAnalyze, state }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [textMode, setTextMode] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = useCallback((file: File) => {
    const validExts = ["pdf", "docx", "doc", "txt"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!validExts.includes(ext ?? "")) return;
    setSelectedFile(file);
    setTextMode(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleSubmit = () => {
    const fd = new FormData();
    if (selectedFile) {
      fd.append("file", selectedFile);
    } else if (pastedText.trim()) {
      fd.append("text", pastedText.trim());
    } else return;
    onAnalyze(fd);
  };

  const isProcessing = ["uploading", "parsing", "analyzing"].includes(
    state.status
  );
  const canSubmit =
    (selectedFile || pastedText.trim().length > 50) && !isProcessing;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {!textMode ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
            ${
              dragOver
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
            }
            ${
              selectedFile
                ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                : ""
            }`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
            onChange={(e) =>
              e.target.files?.[0] && handleFile(e.target.files[0])
            }
          />
          {selectedFile ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <p className="font-semibold text-green-700 dark:text-green-400">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-zinc-500">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="ml-4 p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 mx-auto mb-4 text-zinc-400" />
              <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Drop your contract here
              </p>
              <p className="text-sm text-zinc-500 mt-1">PDF, DOCX, or TXT</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your contract text here..."
            className="w-full h-64 p-4 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
          />
          <p className="text-xs text-zinc-500 text-right">
            {pastedText.length.toLocaleString()} characters
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setTextMode(!textMode);
            setSelectedFile(null);
            setPastedText("");
          }}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {textMode ? "Upload a file instead" : "Or paste text directly"}
        </button>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="px-6 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {state.status === "analyzing"
                ? "Analyzing..."
                : "Processing..."}
            </>
          ) : (
            "Translate Contract"
          )}
        </button>
      </div>

      {state.error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          {state.error}
        </div>
      )}
    </div>
  );
}
