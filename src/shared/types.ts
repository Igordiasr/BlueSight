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

/** [icone, titulo, texto] */
export type Benefit = readonly [IconName, string, string]

/** [numero, titulo, texto] */
export type Step = readonly [string, string, string]

/** [icone, titulo, texto] */
export type Tech = readonly [IconName, string, string]

/** [pergunta, resposta] */
export type Faq = readonly [string, string]