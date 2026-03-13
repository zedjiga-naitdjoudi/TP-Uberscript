import { TropPauvreErreur } from "./error.js"
import { fetchMeals, MealDraft, MealPreview, MealMap } from "./meals.js"
import { User } from "./user.js"
// repas partiel
const draft: MealDraft = {
  name: "Salade",
  price: 12,
  calories: 200
}
console.log("Draft :", draft)


// async function test() {
//     const meals = await fetchMeals()
//     console.log(meals)
// }
// test()
const user = new User(2,"Bob",40)
user.loadStorage()
async function showMeals() {
  const meals = await fetchMeals()
  //indexer par id
  const mealMap: MealMap = {}
  meals.forEach(meal => {
  mealMap[meal.id] = meal
  })
  console.log("MealMap :", mealMap)

  const list = document.getElementById("mealList")
  meals.forEach(meal => { 
      //affichage sans id
      const preview: MealPreview = { 
      name: meal.name,
      calories: meal.calories,
      price: meal.price
     }
      const li = document.createElement("li")
      li.textContent = `${preview.name} - ${preview.price}€`

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