export type Meal = {
    id: number
    name: string
    calories: number
    price: number
}
export type Order = {
  id: number
  meals: Meal[]
  total: number
}
export type MealDraft = Partial<Meal>
export type MealPreview = Omit<Meal, "id">
export type MealMap = Record<number, Meal>  


export async function fetchMeals(): Promise<Meal[]> {
    try {
        const answer = await fetch("https://keligmartin.github.io/api/meals.json")
        const data = await answer.json()
        return data
    } 
    catch(error) {
        console.error("Erreur lors du chargement des repas")
        return[]
    }
    
}