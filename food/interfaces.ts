export interface Food {
  _id: string
  name: string
  price: number
  descrtiption?: string
  amount: MassAmount | VolumeAmount
  owner: string
}

export interface MassAmount {
  mass: number
}

export interface VolumeAmount {
  volume: number
}
