import bcrypt from "bcryptjs";

export const categories = [
  {
    name: "Electrónicos",
  },
  {
    name: "Mecánicos",
  },
  {
    name: "Ferretería",
  },
  {
    name: "Mecatrónica",
  },
];

export const products = [
      {
        name: 'Motor paso a paso',
        description: 'Motor paso a paso',
        price: 30000,
        category_id: 1,
      },
      {
        name: 'Motor electrico',
        description: 'Motor electrico de 12V',
        price: 20000,
        category_id: 2,
      },
      {
        name: 'Tornillo de acero inoxidable',
        description: 'de alta resistencia',
        price: 350,
        category_id: 3,
      },
      {
        name: 'Meccanismo de engranaje',
        description: 'de alta resistencia',
        price: 56000,
        category_id: 4,
      },
      {
        name: 'Motor nema 23',
        description: 'Motor paso a paso de alta potencia',
        price: 65000,
        category_id: 4,
      },
];


