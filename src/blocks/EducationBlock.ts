import type { Education } from "../models/ResumeModel";
import type { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  constructor(private data: Education[]) {}

  render(): HTMLElement {
    const section = document.createElement("section");
    section.className = "section education";

    const title = document.createElement("h2");
    title.textContent = "Education";
    section.append(title);

    for (const item of this.data) {
      const educationItem = document.createElement("p");
      educationItem.className = "education-item";
      educationItem.textContent = `${item.degree} ${item.field}, ${item.institution} (${item.graduation})`;
      section.append(educationItem);
    }

    return section;
  }
}
