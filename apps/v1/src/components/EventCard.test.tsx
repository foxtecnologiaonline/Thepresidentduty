import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ACTIONS } from "../data/actions";
import { EVENTS } from "../data/events";
import { EventCard } from "./EventCard";

const event = EVENTS.find((e) => e.id === "greve-policial")!;

describe("EventCard", () => {
  it("renderiza o título, a descrição e cada escolha do evento", () => {
    render(
      <EventCard
        event={event}
        turnLabel="Jan–Mar · Ano 1"
        turn={1}
        actions={ACTIONS}
        selectedAction={null}
        multiplier={1}
        onSelectAction={() => {}}
        onChoose={() => {}}
      />
    );

    expect(screen.getByText(event.title)).toBeInTheDocument();
    expect(screen.getByText(event.description)).toBeInTheDocument();
    for (const choice of event.choices) {
      expect(screen.getByText(choice.label)).toBeInTheDocument();
    }
  });

  it("chama onChoose com a escolha correta ao clicar nela", () => {
    const onChoose = vi.fn();
    render(
      <EventCard
        event={event}
        turnLabel="Jan–Mar · Ano 1"
        turn={1}
        actions={ACTIONS}
        selectedAction={null}
        multiplier={1}
        onSelectAction={() => {}}
        onChoose={onChoose}
      />
    );

    fireEvent.click(screen.getByText(event.choices[0].label));
    expect(onChoose).toHaveBeenCalledWith(event.choices[0]);
  });

  it("bloqueia diretivas com minTurn ainda não atingido", () => {
    const lockedAction = ACTIONS.find((a) => a.minTurn && a.minTurn > 1)!;
    render(
      <EventCard
        event={event}
        turnLabel="Jan–Mar · Ano 1"
        turn={1}
        actions={ACTIONS}
        selectedAction={null}
        multiplier={1}
        onSelectAction={() => {}}
        onChoose={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: new RegExp(lockedAction.label) });
    expect(button).toBeDisabled();
  });

  it("libera a diretiva e chama onSelectAction quando o turno mínimo é atingido", () => {
    const unlockedAction = ACTIONS.find((a) => a.minTurn && a.minTurn > 1)!;
    const onSelectAction = vi.fn();
    render(
      <EventCard
        event={event}
        turnLabel="Jan–Mar · Ano 2"
        turn={unlockedAction.minTurn!}
        actions={ACTIONS}
        selectedAction={null}
        multiplier={1}
        onSelectAction={onSelectAction}
        onChoose={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: new RegExp(unlockedAction.label) });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    expect(onSelectAction).toHaveBeenCalledWith(unlockedAction);
  });
});
