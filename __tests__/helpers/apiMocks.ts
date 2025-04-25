export const mockTransactionData = {
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
};

export const setupApiMocks = () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTransactionData),
      ok: true,
    })
  ) as jest.Mock;
};
