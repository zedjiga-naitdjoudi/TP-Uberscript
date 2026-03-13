import { Meal } from "./meals.js"
import { fetchMeals } from "./meals.js"

export type Order = {
  id: number
  meals: Meal[]
  total: number
}

// async function test() {
//     const meals = await fetchMeals()
//     console.log(meals)
// }
// test()

async function showMeals() {
  const meals = await fetchMeals()
  const list = document.getElementById("mealList")
  meals.forEach(meal => { 
      const li = document.createElement("li")
      li.textContent = `${meal.name} - ${meal.price}€`

      const button = document.createElement("button")
      button.textContent = "Commander"

      li.appendChild(button)
      list?.appendChild(li)

      button.onclick = () => {
      console.log("Commande :", meal)
}

    })
    
  
}
showMeals()