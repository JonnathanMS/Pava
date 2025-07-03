export type Product = {
  id?: number 
  name: string
  description: string
  price: number
  category_id: number
  category?: {
    id: number
    name: string 
  }
}
