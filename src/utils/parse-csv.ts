const HEADER_ROW = 0;

export interface CsvData {
  [key: string]: string;
}

const parseCsv = (csv: string): CsvData => {
  const data = csv.split("\n").map((row) => row.split(","));
  const results: CsvData = {};

  const headers = data[HEADER_ROW];

  data.forEach((row, index) => {
    if (index === HEADER_ROW) {
      return;
    }

    const [date] = row;
    if (date !== date) {
      return;
    }

    row.forEach((value, rowIndex) => {
      const header = headers[rowIndex].replace(/"/g, "");

      if (header.toLowerCase() === "date") {
        return;
      }

      results[header] = value;
    });
  });

  return results;
};

export default parseCsv;
