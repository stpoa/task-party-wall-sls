export interface Food {
  name: string
  price: number
  descrtiption?: string
  amount: MassAmount | VolumeAmount
  owner: string
}

export type WithId <T extends {}> = { _id: string } & T

export interface MassAmount {
  mass: number
}

export interface VolumeAmount {
  volume: number
}
