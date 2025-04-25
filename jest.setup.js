require("@testing-library/jest-dom");

// Mock pour les fonctionnalités Next.js
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "",
  redirect: jest.fn(),
  revalidatePath: jest.fn(),
}));

// Configuration globale pour fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
  })
);

// Mocks centralisés pour les icônes et UI components problématiques
jest.mock(
  "lucide-react",
  () => {
    const mockedIcons = {};
    const iconNames = [
      "PlusCircle",
      "Check",
      "ChevronLeft",
      "ChevronRight",
      "DownloadIcon",
      "MoreHorizontal",
      "TrendingUp",
      "TrendingDown",
      "Wallet",
      "TrashIcon",
      "Pencil",
      "ArrowUp",
      "ArrowDown",
      "ChevronsUpDown",
      "EyeOff",
    ];

    iconNames.forEach((name) => {
      mockedIcons[name] = () => `<${name} />`;
    });

    return mockedIcons;
  },
  { virtual: true }
);

// Mock pour DataTableFacetedFilter
jest.mock("@/components/datatable/FacetedFilters", () => ({
  DataTableFacetedFilter: () => {
    return null;
  },
}));

// Pour React Query
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn().mockReturnValue({
    data: { transactions: [] },
    refetch: jest.fn(),
    isFetching: false,
  }),
  useMutation: jest.fn().mockReturnValue({
    mutate: jest.fn(),
    isPending: false,
  }),
  QueryClient: jest.fn().mockImplementation(() => ({
    prefetchQuery: jest.fn(),
  })),
  QueryClientProvider: ({ children }) => children,
}));

// Mock pour sonner (toast)
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
  },
}));

// Variables d'environnement
process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";
