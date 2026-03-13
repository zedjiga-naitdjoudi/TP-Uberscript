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
const user = new User(1,"Bob",40)
user.loadStorage()

const list         = document.getElementById("mealList")     as HTMLUListElement
const orderHistory = document.getElementById("orderHistory") as HTMLUListElement
const walletDisplay= document.getElementById("walletDisplay")as HTMLSpanElement
const userNameEl   = document.getElementById("userName")     as HTMLSpanElement
const totalSpentEl = document.getElementById("totalSpent")   as HTMLSpanElement

function updateWallet(): void {
  userNameEl.textContent    = user.name
  walletDisplay.textContent = user.wallet.toString()
}
function updateHistory(): void {
  orderHistory.innerHTML = ""

  if (user.orders.length === 0) {
    orderHistory.innerHTML = '<li class="list-group-item text-muted">Aucune commande</li>'
    totalSpentEl.textContent = "0"
    return
  }

  user.orders.forEach(order => {
    const li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between align-items-center"

    const mealNames = order.meals.map(m => m.name).join(", ")
    li.textContent = `Commande #${order.id} — ${mealNames} — ${order.total}€`
    // bonus delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.className = "btn btn-sm btn-danger"
    deleteBtn.textContent = "Supprimer"
    deleteBtn.onclick = () =>
    {
      user.orders = user.orders.filter(o => o.id !== order.id)
      user.saveStorage()
      updateHistory()
      updateWallet()
    }
    li.appendChild(deleteBtn)




    orderHistory.appendChild(li)
  })

  // bonus total dépensé
  const total = user.orders.reduce((sum, o) => sum + o.total, 0)
  totalSpentEl.textContent = total.toString()
}

async function showMeals() {
  const meals = await fetchMeals()
  //indexer par id
  const mealMap: MealMap = {}
  meals.forEach(meal => {
  mealMap[meal.id] = meal
  })
  console.log("MealMap :", mealMap)

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
            updateWallet()
            updateHistory() 
            console.log("Commande réussie — Wallet :", user.wallet)
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

async function init(): Promise<void> {
   updateWallet() 
   updateHistory()
   await showMeals()
}
init()
