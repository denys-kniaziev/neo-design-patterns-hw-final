import type { ResumeModel } from "../models/ResumeModel";
import type { IBlock } from "./BlockFactory";

export class HeaderBlock implements IBlock {
  constructor(private data: ResumeModel["header"]) {}

  render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "section header";

    const name = document.createElement("h1");
    name.textContent = this.data.fullName;

    const title = document.createElement("p");
    title.className = "title";
    title.textContent = this.data.title;

    const contacts = document.createElement("p");
    contacts.className = "contacts";
    contacts.textContent = [this.data.contacts.email, this.data.contacts.phone, this.data.contacts.location]
      .filter(Boolean)
      .join(" ");

    header.append(name, title, contacts);
    return header;
  }
}
