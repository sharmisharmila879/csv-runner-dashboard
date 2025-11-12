"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  OverallMetrics,
  PersonMetrics,
} from "../utils/metrics";
import { TrendingUp, TrendingDown, Minus, Users } from "lucide-react";

interface MetricsCardProps {
  overallMetrics: OverallMetrics;
  personMetrics: PersonMetrics[];
}

export function MetricsCard({ overallMetrics, personMetrics }: MetricsCardProps) {
  return (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Metrics</CardTitle>
          <CardDescription>Summary statistics for all runs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Minus className="h-4 w-4" aria-hidden="true" />
                <span>Total Runs</span>
              </div>
              <p className="text-2xl font-bold">{overallMetrics.totalRuns}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                <span>Average Miles</span>
              </div>
              <p className="text-2xl font-bold">
                {overallMetrics.averageMiles.toFixed(2)}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingDown className="h-4 w-4" aria-hidden="true" />
                <span>Min Miles</span>
              </div>
              <p className="text-2xl font-bold">
                {overallMetrics.minMiles.toFixed(2)}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
                <span>Max Miles</span>
              </div>
              <p className="text-2xl font-bold">
                {overallMetrics.maxMiles.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Per-Person Metrics */}
      {personMetrics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" aria-hidden="true" />
              Per-Person Metrics
            </CardTitle>
            <CardDescription>
              Individual statistics for each runner
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personMetrics.map((person) => (
                  <div
                    key={person.person}
                    className="p-4 border rounded-lg space-y-2"
                  >
                    <h4 className="font-semibold text-lg">{person.person}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Runs:</span>
                        <span className="font-medium">{person.totalRuns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Average:</span>
                        <span className="font-medium">
                          {person.averageMiles.toFixed(2)} miles
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Min:</span>
                        <span className="font-medium">
                          {person.minMiles.toFixed(2)} miles
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max:</span>
                        <span className="font-medium">
                          {person.maxMiles.toFixed(2)} miles
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

