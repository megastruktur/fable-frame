import type { Field } from "./types";

export default function fieldDragStart(event: DragEvent, item: Field): void {
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', JSON.stringify(item))
  }
}
