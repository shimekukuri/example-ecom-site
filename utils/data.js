import bcrypt from 'bcryptjs';

const data = {
  users: [{
    name: 'Tyler James Hutchinson',
    email: 'jhutchinson192390@gmail.com',
    password: bcrypt.hashSync('Snowman@1923'),
    isAdmin: true,
    shippingAddress: [
      {
        fullName: "tyler James Hutchinson",
        address: "1111 carraige parc drive",
        city: "Chattanooga",
        postal: "37421",
        country: "USA"
      }
    ]
  }, {
    name: 'example user',
    email: 'user@example.com',
    password: bcrypt.hashSync('P@ssW0rd'),
    isAdmin: false,
    shippingAddress: [
      {
        fullName: "Example Example",
        address: "1234 exmaple drive",
        city: "Examplenapolis",
        postal: "99999",
        country: "Cambodia"
      }
    ]
  }],
  products: [
    {
      name: "Free Shirt",
      slug: "free-shirt",
      category: "Shirts",
      image: "/images/shirt1.jpeg",
      price: 70,
      brand: "Niko",
      rating: 4.5,
      numReview: 8,
      countInStock: 20,
      description: "A popular shirt",
    },
    {
      name: "Fit Shirt",
      slug: "fit-shirt",
      category: "Shirts",
      image: "/images/shirt2.png",
      price: 80,
      brand: "Abibas",
      rating: 3.2,
      numReview: 10,
      countInStock: 20,
      description: "A popular shirt",
    },
    {
      name: "Slim Shirt",
      slug: "slim-shirt",
      category: "Shirts",
      image: "/images/shirt3.jpeg",
      price: 90,
      brand: "Poyo",
      rating: 4.5,
      numReview: 3,
      countInStock: 20,
      description: "A popular Shirt",
    },
    {
      name: "Golf Pants",
      slug: "golf-pants",
      category: "Pants",
      image: "/images/pants1.jpeg",
      price: 90,
      brand: "Oliverier",
      rating: 2.9,
      numReview: 13,
      countInStock: 20,
      description: "Smart looking pants",
    },
    {
      name: "Fit Pants",
      slug: "fit-pants",
      category: "Pants",
      image: "/images/pants2.jpeg",
      price: 95,
      brand: "Zoro",
      rating: 3.5,
      numReview: 7,
      countInStock: 20,
      description: "A popular pants",
    },
    {
      name: "Classic Pants",
      slug: "classic-pants",
      category: "Pants",
      image: "/images/pants3.jpeg",
      price: 9001,
      brand: "Costly",
      rating: 5.0,
      numReview: 100,
      countInStock: 1,
      description: "+1 Attractiveness, +2 Knowledge, -1 skill",
    },
  ],
};

export default data;
