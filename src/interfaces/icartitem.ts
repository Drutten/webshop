import IProduct from "./iproduct";

export interface ICartItem {
    product: IProduct;
    quantity: number;
    totalPrice: number; //product.price * quantity
}