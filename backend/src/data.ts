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
];


