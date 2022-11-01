export interface lineItem {
  price_data: {
    currency: String,
    product_data: {
      image: String,
      name: String
    },
    unit_amount: Number,
  },
  description: String,
  quantity: Number
}