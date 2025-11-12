"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, AlertCircle } from "lucide-react";
import { parseCSV, CSVRow } from "../utils/csvParser";

interface FileUploaderProps {
  onFileParsed: (data: CSVRow[], errors: string[]) => void;
  onLoadingChange: (loading: boolean) => void;
}

export function FileUploader({ onFileParsed, onLoadingChange }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }

    setError(null);
    onLoadingChange(true);

    try {
      const result = await parseCSV(file);
      onFileParsed(result.data, result.errors);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse CSV file");
      onFileParsed([], []);
    } finally {
      onLoadingChange(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center w-full">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload CSV file"
          id="csv-upload-input"
        />
        <Button
          onClick={handleButtonClick}
          variant="default"
          size="lg"
          className="w-full sm:w-auto"
          aria-describedby="upload-description"
        >
          <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
          Upload CSV File
        </Button>
        <p
          id="upload-description"
          className="mt-2 text-sm text-muted-foreground text-center"
        >
          Select a CSV file with columns: date, person, miles run
        </p>
      </div>

      {error && (
        <Alert variant="destructive" role="alert">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>Upload Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

