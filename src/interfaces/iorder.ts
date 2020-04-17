import { IOrderRow } from "./iorderrow";

export interface IOrder {
    id: number;
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    status: number;
    totalPrice: number;
    orderRows: IOrderRow[];
}