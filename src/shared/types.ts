export type IconName =
  | 'eye'
  | 'camera'
  | 'layers'
  | 'leaf'
  | 'spark'
  | 'sensor'
  | 'voice'
  | 'mask'
  | 'waves'
  | 'archive'
  | 'play'

export type PhotoNames = 'hero' | 'diver' | 'reef' | 'fish' | 'camera'

export interface PhotoAssets {
  hero: string
  diver: string
  reef: string
  fish: string
  camera: string
}

export interface Benefit {
  icon: IconName
  title: string
  text: string
}

export interface Step {
  number: string
  title: string
  text: string
}

export interface Tech {
  icon: IconName
  title: string
  text: string
}

export interface Faq {
  question: string
  answer: string
}