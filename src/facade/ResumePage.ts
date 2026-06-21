import { ResumeImporter } from "../importer/ResumeImporter";

export class ResumePage {
  async init(jsonPath: string): Promise<void> {
    try {
      const data = await this.fetchData(jsonPath);
      new ResumeImporter(data).import();
    } catch (error) {
      this.renderError(error);
    }
  }

  private async fetchData(path: string): Promise<unknown> {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private renderError(error: unknown): void {
    const root = document.getElementById("resume-content");
    const message = error instanceof Error ? error.message : "Unknown resume rendering error";

    if (root) {
      root.textContent = message;
    }

    console.error(error);
  }
}
