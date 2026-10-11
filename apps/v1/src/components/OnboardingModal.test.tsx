import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OnboardingModal } from "./OnboardingModal";

describe("OnboardingModal", () => {
  it("expõe um diálogo acessível e modal", () => {
    render(<OnboardingModal onDismiss={() => {}} />);
    expect(screen.getByRole("dialog", { name: "Como jogar" })).toBeInTheDocument();
  });

  it("coloca o foco inicial no botão de dispensar", () => {
    render(<OnboardingModal onDismiss={() => {}} />);
    expect(screen.getByRole("button", { name: "Entendi, começar!" })).toHaveFocus();
  });

  it("chama onDismiss ao clicar no botão", () => {
    const onDismiss = vi.fn();
    render(<OnboardingModal onDismiss={onDismiss} />);
    fireEvent.click(screen.getByRole("button", { name: "Entendi, começar!" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
