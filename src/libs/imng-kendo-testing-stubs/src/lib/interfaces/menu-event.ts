export interface MenuEvent {
  isDefaultPrevented(): boolean;
  preventDefault(): void;
  index?: string;
  item?: unknown;
  sender: unknown;
}
