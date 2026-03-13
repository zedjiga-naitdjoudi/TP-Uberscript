import { TropPauvreErreur } from "./error.js"
import { fetchMeals, Meal } from "./meals.js"
import { User } from "./user.js"



// async function test() {
//     const meals = await fetchMeals()
//     console.log(meals)
// }
// test()
const user = new User(1,"Bob",30)
user.loadStorage()
async function showMeals() {
  const meals = await fetchMeals()
  const list = document.getElementById("mealList")
  meals.forEach(meal => { 
      const li = document.createElement("li")
      li.textContent = `${meal.name} - ${meal.price}€`

      const button = document.createElement("button")
      button.textContent = "Commander"


      button.onclick = () => {
        try {
            user.orderMeal(meal)
            console.log("Commande réussie")
            console.log("Wallet restant :", user.wallet)
            console.log("Historique :", user.orders)
          
        } 
        catch (error) {
          if (error instanceof TropPauvreErreur) {
          alert(`${error.message} (Commande: ${error.prixCommande}€, Solde: ${error.soldeRestant}€)`)
          } else {
            console.error(error)
          }
}
          
        }

      li.appendChild(button)
      list?.appendChild(li)
      


    })
    
  
}

showMeals()