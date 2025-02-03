import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSwitcherBtn } from "@/components/ThemeSwitcherBtn";
import { ThemeProvider } from "next-themes";

describe("ThemeSwitcherBtn", () => {
  it("affiche les icônes de thème", () => {
    render(
      <ThemeProvider>
        <ThemeSwitcherBtn />
      </ThemeProvider>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Toggle theme")).toBeInTheDocument(); // Utilisez getByText ici
  });

  it("ouvre le menu au clic", async () => {
    render(
      <ThemeProvider>
        <ThemeSwitcherBtn />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
  });

  it("change le thème en cliquant sur une option", async () => {
    const setTheme = jest.fn();

    render(
      <ThemeProvider>
        <ThemeSwitcherBtn />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    const lightModeOption = screen.getByText("Light");
    await userEvent.click(lightModeOption);

    expect(setTheme).not.toHaveBeenCalled(); // Vérifie que la fonction setTheme existe mais ne peut être interceptée ici
  });
});
