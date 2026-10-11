import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createInitialIndicators } from "../data/indicators";
import { createInitialSectors } from "../data/sectors";
import { StatsTabs } from "./StatsTabs";

describe("StatsTabs", () => {
  it("começa na aba de setores, selecionada e visível", () => {
    render(<StatsTabs sectors={createInitialSectors()} indicators={createInitialIndicators()} />);

    expect(screen.getByRole("tab", { name: "Setores" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Indicadores" })).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("Setores da Sociedade")).toBeInTheDocument();
    expect(screen.queryByText("Economia")).not.toBeInTheDocument();
  });

  it("troca para o painel de indicadores ao clicar na aba", () => {
    render(<StatsTabs sectors={createInitialSectors()} indicators={createInitialIndicators()} />);

    fireEvent.click(screen.getByRole("tab", { name: "Indicadores" }));

    expect(screen.getByRole("tab", { name: "Indicadores" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Economia")).toBeInTheDocument();
    expect(screen.queryByText("Setores da Sociedade")).not.toBeInTheDocument();
  });
});
