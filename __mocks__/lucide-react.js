// Mock pour tous les composants lucide-react
const createMockComponent = (name) => {
  const component = () => null;
  component.displayName = name;
  return component;
};

// Liste complète des icônes utilisées dans l'application
const icons = [
  "Search",
  "ArrowDown",
  "ArrowUp",
  "ChevronsUpDown",
  "EyeOff",
  "Check",
  "PlusSquare",
  "ChevronLeft",
  "ChevronRight",
  "DownloadIcon",
  "MoreHorizontal",
  "Pencil",
  "TrashIcon",
  "Settings2",
  "TrendingUp",
  "TrendingDown",
  "Wallet",
  "Loader2",
  "Calendar1Icon",
  "PlusCircle",
  "CircleOff",
];

const mockExports = icons.reduce((acc, name) => {
  acc[name] = createMockComponent(name);
  return acc;
}, {});

module.exports = mockExports;
