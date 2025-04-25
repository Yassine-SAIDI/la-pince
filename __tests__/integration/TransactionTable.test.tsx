import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Importation correcte
import TransactionTable from "@/app/transactions/_components/TransactionTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jest } from "@jest/globals";

// Mock les composants problématiques
jest.mock("@/components/datatable/FacetedFilters", () => ({
  DataTableFacetedFilter: () => (
    <div data-testid="mock-faceted-filter">Filtres</div>
  ),
}));

jest.mock("export-to-csv", () => ({
  download: jest.fn(),
  generateCsv: jest.fn(() => "mock-csv"),
  mkConfig: jest.fn(() => ({})),
}));

// Mock de fetch pour simuler les appels API
global.fetch = jest.fn(
  (): Promise<Response> =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          transactions: [
            {
              id: "1",
              amount: 100,
              formattedAmount: "100,00 €",
              description: "Test transaction",
              category: { name: "Test Category", color: "#ff0000" },
              date: new Date().toISOString(),
              type: "income",
            },
          ],
        }),
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      redirected: false,
      url: "",
      blob: () => Promise.resolve(new Blob()),
      text: () => Promise.resolve(""),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      formData: () => Promise.resolve(new FormData()),
      body: null,
      bodyUsed: false,
      clone: function () {
        return this as Response;
      },
    } as unknown as Response)
);

describe("TransactionTable Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render transaction table with data", () => {
    const from = new Date();
    const to = new Date();

    render(
      <QueryClientProvider client={queryClient}>
        <TransactionTable from={from} to={to} />
      </QueryClientProvider>
    );

    // Correction de l'assertion
    const exportButton = screen.getByText(/Exporter CSV/i);
    expect(exportButton).toBeInTheDocument();
  });
});
