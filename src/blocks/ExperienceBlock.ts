import type { Experience } from "../models/ResumeModel";
import type { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

export class ExperienceBlock implements IBlock {
  constructor(private data: Experience[]) {}

  render(): HTMLElement {
    const section = document.createElement("section");
    section.className = "section experience";

    const title = document.createElement("h2");
    title.textContent = "Experience";
    section.append(title);

    for (const item of this.data) {
      const experienceItem = document.createElement("div");
      experienceItem.className = "experience-item";

      const heading = document.createElement("p");
      const position = document.createElement("strong");
      position.textContent = item.position;

      const company = document.createElement("em");
      company.textContent = item.company;

      heading.append(position, " at ", company, ` (${item.start} – ${item.end})`);
      experienceItem.append(heading);

      for (const project of item.projects) {
        const block: IBlock = project.isRecent
          ? new HighlightDecorator(new ProjectBlock(project))
          : new ProjectBlock(project);

        experienceItem.append(block.render());
      }

      section.append(experienceItem);
    }

    return section;
  }
}
