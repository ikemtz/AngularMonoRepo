export interface ChunkSettings {
  size?: number;
  autoRetryAfter?: number;
  maxAutoRetries?: number;
  resumable?: boolean;
}
