export interface PasteCleanupSettings {
  convertMsLists?: boolean;
  removeHtmlComments?: boolean;
  stripTags?: string[];
  removeAttributes?: string[] | 'all';
  removeMsClasses?: boolean;
  removeMsStyles?: boolean;
  removeInvalidHTML?: boolean;
}
