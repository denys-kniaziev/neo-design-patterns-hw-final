import type { Skills } from "../models/ResumeModel";
import type { IBlock } from "./BlockFactory";

export class SkillsBlock implements IBlock {
  constructor(private data: Skills) {}

  render(): HTMLElement {
    const section = document.createElement("section");
    section.className = "section skills";

    const title = document.createElement("h2");
    title.textContent = "Skills";

    const list = document.createElement("ul");
    list.className = "skills-list";

    for (const [category, values] of Object.entries(this.data)) {
      const item = document.createElement("li");
      const label = document.createElement("strong");
      label.textContent = category;

      item.append(label, `: ${values.join(", ")}`);
      list.append(item);
    }

    section.append(title, list);
    return section;
  }
}
