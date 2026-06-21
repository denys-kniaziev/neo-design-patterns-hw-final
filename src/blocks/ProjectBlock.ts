import type { Project } from "../models/ResumeModel";
import type { IBlock } from "./BlockFactory";

export class ProjectBlock implements IBlock {
  constructor(private data: Project) {}

  render(): HTMLElement {
    const container = document.createElement("div");
    container.className = "project-item";
    container.textContent = `• ${this.data.name} – ${this.data.description}`;

    return container;
  }
}
