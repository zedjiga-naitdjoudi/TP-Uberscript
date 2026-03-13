import { Order } from "./app.js"
import {Meal} from "./meals.js"
import { TropPauvreErreur } from "./error.js"

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

    orderMeal(meal: Meal){
        if (this.wallet < meal.price) {
            throw new TropPauvreErreur ("Fonds insuffisants", meal.price, this.wallet)
        }
        this.wallet -= meal.price
        const order: Order = {
            id: Date.now(),
            meals: [meal],
            total: meal.price
        }
        this.orders.push(order)


    }
    
}
