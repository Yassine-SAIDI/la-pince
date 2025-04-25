// Mock pour export-to-csv
module.exports = {
  download: jest.fn(),
  generateCsv: jest.fn(() => "mock-csv-content"),
  mkConfig: jest.fn(() => ({})),
  asString: jest.fn(),
  asBlob: jest.fn(),
  MediaType: {
    CSV: "text/csv",
    TXT: "text/plain",
    JSON: "application/json",
  },
};
