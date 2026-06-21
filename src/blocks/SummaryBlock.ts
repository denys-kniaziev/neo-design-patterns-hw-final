import type { ResumeModel } from "../models/ResumeModel";
import type { IBlock } from "./BlockFactory";

export class SummaryBlock implements IBlock {
  constructor(private data: ResumeModel["summary"]) {}

  render(): HTMLElement {
    const section = document.createElement("section");
    section.className = "section summary";

    const title = document.createElement("h2");
    title.textContent = "Summary";

    const text = document.createElement("p");
    text.textContent = this.data.text;

    section.append(title, text);
    return section;
  }
}
