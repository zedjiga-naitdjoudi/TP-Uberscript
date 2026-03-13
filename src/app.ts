import { Meal } from "./meals.js"
import { fetchMeals } from "./meals.js"

export type Order = {
  id: number
  meals: Meal[]
  total: number
}

async function test() {
    const meals = await fetchMeals()
    console.log(meals)
}
test()