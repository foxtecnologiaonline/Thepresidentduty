import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("oferece um botão acessível para trocar para o tema escuro quando está no claro", () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: "Mudar para tema escuro" })).toBeInTheDocument();
  });

  it("oferece um botão acessível para trocar para o tema claro quando está no escuro", () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: "Mudar para tema claro" })).toBeInTheDocument();
  });

  it("chama onToggle ao clicar", () => {
    const onToggle = vi.fn();
    render(<ThemeToggle theme="dark" onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
