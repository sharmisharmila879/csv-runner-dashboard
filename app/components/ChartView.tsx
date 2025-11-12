"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CSVRow } from "../utils/csvParser";

interface ChartViewProps {
  data: CSVRow[];
}

interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export function ChartView({ data }: ChartViewProps) {
  if (data.length === 0) {
    return null;
  }

  // Group data by date and person
  const dateMap = new Map<string, Map<string, number>>();
  const people = new Set<string>();

  data.forEach((row) => {
    people.add(row.person);
    if (!dateMap.has(row.date)) {
      dateMap.set(row.date, new Map());
    }
    dateMap.get(row.date)!.set(row.person, row.miles);
  });

  // Prepare chart data
  const chartData: ChartDataPoint[] = Array.from(dateMap.entries())
    .map(([date, personMap]) => {
      const point: ChartDataPoint = { date };
      people.forEach((person) => {
        point[person] = personMap.get(person) || 0;
      });
      return point;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const peopleArray = Array.from(people).sort();
  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Miles Run by Date</CardTitle>
          <CardDescription>
            Bar chart showing miles run per person by date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12 }}
              />
              <YAxis label={{ value: "Miles", angle: -90, position: "insideLeft" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              {peopleArray.map((person, index) => (
                <Bar
                  key={person}
                  dataKey={person}
                  fill={colors[index % colors.length]}
                  name={person}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Miles Run Trend</CardTitle>
          <CardDescription>
            Line chart showing running trends over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12 }}
              />
              <YAxis label={{ value: "Miles", angle: -90, position: "insideLeft" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              {peopleArray.map((person, index) => (
                <Line
                  key={person}
                  type="monotone"
                  dataKey={person}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  name={person}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

