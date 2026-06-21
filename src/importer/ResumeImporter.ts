import { AbstractImporter } from "./AbstractImporter";
import type { ResumeModel } from "../models/ResumeModel";
import { BlockFactory } from "../blocks/BlockFactory";
import type { BlockType } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  protected validate(): void {
    if (!this.isRecord(this.raw)) {
      throw new Error("Resume JSON must be an object");
    }

    for (const key of ["header", "summary", "experience", "education", "skills"]) {
      if (!(key in this.raw)) {
        throw new Error(`Missing required resume block: ${key}`);
      }
    }

    if (!this.isRecord(this.raw.header) || !this.isRecord(this.raw.summary) || !this.isRecord(this.raw.skills)) {
      throw new Error("Invalid resume block format");
    }

    if (!Array.isArray(this.raw.experience) || !Array.isArray(this.raw.education)) {
      throw new Error("Experience and education blocks must be arrays");
    }
  }

  protected map(): ResumeModel {
    return this.raw as ResumeModel;
  }

  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content");

    if (!root) {
      throw new Error("Root element #resume-content was not found");
    }

    const factory = new BlockFactory();
    const blockOrder: BlockType[] = ["header", "summary", "experience", "education", "skills"];

    root.replaceChildren(...blockOrder.map((type) => factory.createBlock(type, model).render()));
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }
}
