/* eslint-disable no-magic-numbers */
import { CsvData } from "./parse-csv";

const NOT_NUMBERS_REGEXP = /[^0-9.]/g;

const twoDecimalsNumber = (value: number): number => Math.round(value * 100) / 100;

export interface DataCoverage {
  [key: string]: { version: number; coverage: number; usage: number };
}

const formatData = (data: CsvData): DataCoverage => {
  const versions: number[][] = Object.entries(data)
    .map(([key, value]) => [key.replace(NOT_NUMBERS_REGEXP, ""), value.replace(NOT_NUMBERS_REGEXP, "")])
    .map(([key, value]) => [Number(key), Number(value)])
    .sort(([a], [b]) => b - a);

  const results: DataCoverage = {};

  versions.forEach(([version, usage], index) => {
    const key = isNaN(version) ? "Other" : String(version);

    const coverage = versions.slice(0, index + 1).reduce((acc, [, usage]) => twoDecimalsNumber(acc + usage), 0);

    results[key] = {
      version,
      coverage,
      usage,
    };
  });

  return results;
};

export default formatData;
