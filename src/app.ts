import { TropPauvreErreur } from "./error.js"
import { Meal } from "./meals.js"
import { fetchMeals } from "./meals.js"
import { User } from "./user.js"



// async function test() {
//     const meals = await fetchMeals()
//     console.log(meals)
// }
// test()
const user = new User(1,"Bob",0)
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
        try {
          user.orderMeal(meal)
          console.log("Commande reussie")
          
        } 
        catch (error) {
          if (error instanceof TropPauvreErreur) {
          alert(`${error.message} (Commande: ${error.prixCommande}€, Solde: ${error.soldeRestant}€)`)
          } else {
            console.error(error)
          }
}
          
        }
      


    })
    
  
}

showMeals()