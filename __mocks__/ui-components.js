// Mock pour les composants UI complexes qui causent des problèmes dans les tests

// Mock pour DataTableFacetedFilter
const DataTableFacetedFilter = jest.fn(() => {
  return null;
});

module.exports = {
  DataTableFacetedFilter,
};
