"use client";

import React, { useState } from "react";
import { FileUploader } from "./components/FileUploader";
import { DataTable } from "./components/DataTable";
import { ChartView } from "./components/ChartView";
import { MetricsCard } from "./components/MetricsCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CSVRow } from "./utils/csvParser";
import {
  calculateOverallMetrics,
  calculatePersonMetrics,
} from "./utils/metrics";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Home() {
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileParsed = (data: CSVRow[], parseErrors: string[]) => {
    setCsvData(data);
    setErrors(parseErrors);
  };

  const overallMetrics = calculateOverallMetrics(csvData);
  const personMetrics = calculatePersonMetrics(csvData);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            CSV Runner Dashboard
          </h1>
          <p className="text-muted-foreground">
            Upload a CSV file to analyze running data and visualize metrics
          </p>
        </header>

        <div className="space-y-6">
          {/* File Upload Section */}
          <section aria-labelledby="upload-heading">
            <h2 id="upload-heading" className="sr-only">
              File Upload
            </h2>
            <FileUploader
              onFileParsed={handleFileParsed}
              onLoadingChange={setLoading}
            />
          </section>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading" />
              <span className="ml-2 text-muted-foreground">Processing CSV file...</span>
            </div>
          )}

          {/* Error Messages */}
          {errors.length > 0 && !loading && (
            <Alert variant="destructive" role="alert">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>Validation Errors</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Data Display */}
          {csvData.length > 0 && !loading && (
            <>
              {/* Metrics Section */}
              <section aria-labelledby="metrics-heading">
                <h2 id="metrics-heading" className="sr-only">
                  Metrics
                </h2>
                <MetricsCard
                  overallMetrics={overallMetrics}
                  personMetrics={personMetrics}
                />
              </section>

              {/* Charts Section */}
              <section aria-labelledby="charts-heading">
                <h2 id="charts-heading" className="sr-only">
                  Charts
                </h2>
                <ChartView data={csvData} />
              </section>

              {/* Data Table Section */}
              <section aria-labelledby="table-heading">
                <h2 id="table-heading" className="sr-only">
                  Data Table
                </h2>
                <DataTable data={csvData} />
              </section>
            </>
          )}

          {/* Empty State */}
          {csvData.length === 0 && !loading && errors.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Upload a CSV file to get started</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

