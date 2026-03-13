import { Order } from "./app"

export class User {
    id: number
    name: string
    wallet: number
    orders: Order[]

    constructor(id: number, name: string, wallet: number){
        this.id = id
        this.name = name
        this.wallet = wallet
        this.orders = []
    }
}