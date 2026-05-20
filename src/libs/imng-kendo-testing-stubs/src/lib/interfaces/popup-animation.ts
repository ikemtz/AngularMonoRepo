import { AnimationType, AnimationDirection } from '../type';

export interface PopupAnimation {
  type?: AnimationType;
  duration?: number;
  direction?: AnimationDirection;
}
