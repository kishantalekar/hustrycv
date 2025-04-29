export const ANIMATIONS = {
  CV_LOADING: 'cv_loading.json',
  FOX_MEDITATING: 'fox_ meditating.json',
  FOX_CONGRATULATION: 'fox_congratulation.json',
  FOX_WALKING: 'fox_walking.json',
  GIRAFFE_MEDITATING: 'giraffe_ meditating.json',
} as const;

export type AnimationName = keyof typeof ANIMATIONS;
