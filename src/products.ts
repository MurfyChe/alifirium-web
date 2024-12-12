export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: "Alifie Relaxantă",
      description: "Ingrediente naturale pentru un efect calmant.",
      price: 50.0,
      stock: 100,
      imageUrl: "images/product1.jpg",
    },
    {
      id: 2,
      name: "Alifie Anti-Inflamatoare",
      description: "Calmează durerile și reduce inflamația.",
      price: 70.0,
      stock: 50,
      imageUrl: "images/product2.jpg",
    },
    {
      id: 3,
      name: "Alifie Revitalizantă",
      description: "Conferă pielii o senzație de prospețime și revitalizare.",
      price: 65.0,
      stock: 75,
      imageUrl: "images/product3.jpg",
    },
    {
        id: 4,
        name: "Alifie pentru functiile erectile",
        description: "Ajuta face pula mare tine mult fute bine.",
        price: 99.09,
        stock: 31,
        imageUrl: "",

    },
    {
        id: 5,
        name: "Alifie pentru functiile erectile",
        description: "Ajuta face pula mare tine mult fute bine.",
        price: 99.01,
        stock: 31,
        imageUrl: "",

    },
    {
        id: 6,
        name: "Alifie pentru functiile erectile",
        description: "Ajuta face pula mare tine mult fute bine.",
        price: 99.09,
        stock: 31,
        imageUrl: "",

    },
  ];
  