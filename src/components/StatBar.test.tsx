import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatBar } from "./StatBar";

describe("StatBar", () => {
  it("expõe o valor atual via role progressbar com os limites corretos", () => {
    render(<StatBar icon="💰" label="Economia" description="Saúde das contas públicas." value={62} />);
    const bar = screen.getByRole("progressbar", { name: "Economia" });
    expect(bar).toHaveAttribute("aria-valuenow", "62");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("arredonda o valor exibido e usado no progressbar", () => {
    render(<StatBar icon="💰" label="Economia" description="desc" value={62.7} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "63");
  });

  it("aplica a classe de status crítico quando o indicador está em risco", () => {
    const { container } = render(
      <StatBar icon="😊" label="Popularidade" description="desc" value={10} critical />
    );
    expect(container.querySelector(".critical-warning")).not.toBeNull();
    expect(container.querySelector(".danger")).not.toBeNull();
  });
});
