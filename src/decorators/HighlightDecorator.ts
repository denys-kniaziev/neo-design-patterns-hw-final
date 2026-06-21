import type { IBlock } from "../blocks/BlockFactory";

export class HighlightDecorator implements IBlock {
  constructor(private wrapped: IBlock) {}

  render(): HTMLElement {
    const element = this.wrapped.render();
    element.classList.add("highlight");

    return element;
  }
}
