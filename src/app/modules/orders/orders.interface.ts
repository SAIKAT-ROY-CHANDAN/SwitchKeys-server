export type TOrder = {
    cartId: string,
    counter: number;
    orderCount: number;
    price: number;
    productId: string;
    quantity: number;
}

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    orders: {
      [key: string]: TOrder;
    };
  }