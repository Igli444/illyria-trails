import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FaqAccordion } from "./FaqAccordion";
import type { FaqItem } from "@/types/content";

const items: FaqItem[] = [
  { question: "Question one?", answer: "Answer one." },
  { question: "Question two?", answer: "Answer two." },
  { question: "Question three?", answer: "Answer three." },
];

describe("FaqAccordion", () => {
  it("renders all item questions, with the first item open by default", () => {
    render(<FaqAccordion items={items} />);

    for (const item of items) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }

    expect(screen.getByText("Answer one.")).toBeInTheDocument();
    expect(screen.queryByText("Answer two.")).not.toBeInTheDocument();
    expect(screen.queryByText("Answer three.")).not.toBeInTheDocument();

    const firstButton = screen.getByRole("button", { name: "Question one?" });
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
  });

  it("opens a closed question on click and shows its answer; clicking the open one closes it", () => {
    render(<FaqAccordion items={items} />);

    const secondButton = screen.getByRole("button", { name: "Question two?" });
    fireEvent.click(secondButton);
    expect(screen.getByText("Answer two.")).toBeInTheDocument();
    expect(secondButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(secondButton);
    expect(screen.queryByText("Answer two.")).not.toBeInTheDocument();
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
  });

  it("only keeps one item open at a time", () => {
    render(<FaqAccordion items={items} />);

    expect(screen.getByText("Answer one.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Question three?" }));

    expect(screen.queryByText("Answer one.")).not.toBeInTheDocument();
    expect(screen.getByText("Answer three.")).toBeInTheDocument();
    expect(screen.queryByText("Answer two.")).not.toBeInTheDocument();
  });
});
