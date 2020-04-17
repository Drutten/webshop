import IProduct from "./iproduct";

export interface IOrderRow {
    id: number;
    productId: number;
    product: IProduct | null;
    amount: number;
    orderId: number;
}