import Papa from "papaparse";

export interface CSVRow {
  date: string;
  person: string;
  miles: number;
}

export interface ParseResult {
  data: CSVRow[];
  errors: string[];
}

const REQUIRED_HEADERS = ["date", "person", "miles run"];

export function validateHeaders(headers: string[]): { valid: boolean; error?: string } {
  if (headers.length !== REQUIRED_HEADERS.length) {
    return {
      valid: false,
      error: `Expected ${REQUIRED_HEADERS.length} columns, found ${headers.length}`,
    };
  }

  const normalizedHeaders = headers.map((h) => h.trim().toLowerCase());
  const normalizedRequired = REQUIRED_HEADERS.map((h) => h.trim().toLowerCase());

  for (let i = 0; i < REQUIRED_HEADERS.length; i++) {
    if (normalizedHeaders[i] !== normalizedRequired[i]) {
      return {
        valid: false,
        error: `Invalid header at column ${i + 1}. Expected "${REQUIRED_HEADERS[i]}", found "${headers[i]}"`,
      };
    }
  }

  return { valid: true };
}

export function parseCSV(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: string[] = [];

        // Validate headers
        if (results.meta.fields) {
          const headerValidation = validateHeaders(results.meta.fields);
          if (!headerValidation.valid) {
            resolve({
              data: [],
              errors: [headerValidation.error || "Invalid CSV headers"],
            });
            return;
          }
        } else {
          resolve({
            data: [],
            errors: ["CSV file must have headers"],
          });
          return;
        }

        // Parse and validate rows
        const parsedData: CSVRow[] = [];
        const data = results.data as any[];

        if (data.length === 0) {
          resolve({
            data: [],
            errors: ["CSV file is empty or contains no valid data"],
          });
          return;
        }

        data.forEach((row, index) => {
          const date = String(row["date"] || "").trim();
          const person = String(row["person"] || "").trim();
          const milesStr = String(row["miles run"] || "").trim();

          if (!date || !person || !milesStr) {
            errors.push(`Row ${index + 2}: Missing required field(s)`);
            return;
          }

          const miles = parseFloat(milesStr);
          if (isNaN(miles) || miles < 0) {
            errors.push(`Row ${index + 2}: Invalid miles value "${milesStr}"`);
            return;
          }

          parsedData.push({
            date,
            person,
            miles,
          });
        });

        resolve({
          data: parsedData,
          errors,
        });
      },
      error: (error) => {
        resolve({
          data: [],
          errors: [`Failed to parse CSV: ${error.message}`],
        });
      },
    });
  });
}

