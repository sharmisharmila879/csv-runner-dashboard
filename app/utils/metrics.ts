import { CSVRow } from "./csvParser";

export interface OverallMetrics {
  totalRuns: number;
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
}

export interface PersonMetrics {
  person: string;
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
  totalRuns: number;
}

export function calculateOverallMetrics(data: CSVRow[]): OverallMetrics {
  if (data.length === 0) {
    return {
      totalRuns: 0,
      averageMiles: 0,
      minMiles: 0,
      maxMiles: 0,
    };
  }

  const miles = data.map((row) => row.miles);
  const totalMiles = miles.reduce((sum, m) => sum + m, 0);

  return {
    totalRuns: data.length,
    averageMiles: totalMiles / data.length,
    minMiles: Math.min(...miles),
    maxMiles: Math.max(...miles),
  };
}

export function calculatePersonMetrics(data: CSVRow[]): PersonMetrics[] {
  const personMap = new Map<string, number[]>();

  // Group miles by person
  data.forEach((row) => {
    if (!personMap.has(row.person)) {
      personMap.set(row.person, []);
    }
    personMap.get(row.person)!.push(row.miles);
  });

  // Calculate metrics for each person
  const personMetrics: PersonMetrics[] = [];
  personMap.forEach((miles, person) => {
    const totalMiles = miles.reduce((sum, m) => sum + m, 0);
    personMetrics.push({
      person,
      averageMiles: totalMiles / miles.length,
      minMiles: Math.min(...miles),
      maxMiles: Math.max(...miles),
      totalRuns: miles.length,
    });
  });

  // Sort by person name
  return personMetrics.sort((a, b) => a.person.localeCompare(b.person));
}

