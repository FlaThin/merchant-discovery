export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  images: string[]
  colors: { name: string; hex: string }[]
  rating: number
  reviewCount: number
  isNew?: boolean
  discount?: number
  description?: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "AirPods Pro Max",
    price: 2499.99,
    category: "headphones",
    image: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    colors: [
      { name: "Space Gray", hex: "#5A5A5A" },
      { name: "Silver", hex: "#E5E5E5" },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "Pink", hex: "#FFB6C1" },
      { name: "Green", hex: "#90EE90" },
    ],
    rating: 5,
    reviewCount: 1247,
    isNew: true,
    discount: 15,
    description: "Fones de ouvido premium com cancelamento ativo de ruído e áudio espacial.",
  },
  {
    id: "2",
    name: "HomePod Mini",
    price: 899.99,
    category: "speakers",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Space Gray", hex: "#5A5A5A" },
      { name: "Orange", hex: "#FFA500" },
      { name: "Yellow", hex: "#FFFF00" },
      { name: "Blue", hex: "#0000FF" },
    ],
    rating: 4,
    reviewCount: 892,
    discount: 10,
  },
  {
    id: "3",
    name: "Apple Watch Ultra",
    price: 3999.99,
    category: "watches",
    image: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    colors: [
      { name: "Titanium", hex: "#C0C0C0" },
      { name: "Natural", hex: "#F5F5DC" },
    ],
    rating: 5,
    reviewCount: 2156,
    isNew: true,
  },
  {
    id: "4",
    name: "Magic Keyboard",
    price: 1299.99,
    category: "accessories",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
    ],
    rating: 4,
    reviewCount: 567,
  },
  {
    id: "5",
    name: "Studio Display",
    price: 8999.99,
    category: "accessories",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    colors: [{ name: "Silver", hex: "#E5E5E5" }],
    rating: 5,
    reviewCount: 423,
    isNew: true,
  },
  {
    id: "6",
    name: "AirPods 3rd Gen",
    price: 1299.99,
    category: "headphones",
    image: "/placeholder.svg?height=400&width=400",
    images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
    colors: [{ name: "White", hex: "#FFFFFF" }],
    rating: 4,
    reviewCount: 1834,
    discount: 20,
  },
]
