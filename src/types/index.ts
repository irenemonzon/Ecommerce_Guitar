export type IGuitar = {
    id: number
    name: string,
    image:string,
    description:string
    price: number
}
export interface CartItem extends IGuitar {
    quantity:number
}

export type GuitarId=IGuitar['id']