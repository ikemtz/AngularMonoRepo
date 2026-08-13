export interface EditorPasteEvent {
  isDefaultPrevented: () => boolean;
  preventDefault: () => void;
  cleanedHtml: string;
  originalEvent: ClipboardEvent;
  originalHtml: string;
}
