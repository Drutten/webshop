import axios, { AxiosResponse } from 'axios';
import { IOrder } from '../interfaces/iorder';
import { INewOrder } from '../interfaces/ineworder';


export interface IOrderService {
    getOrders(url: string): Promise<[IOrder[], string]>;
    getOrder(url: string): Promise<[IOrder | null, string]>;
    deleteOrder(url: string): Promise<string>;
    postOrder(url: string, data: INewOrder): Promise<string>;
}



export class OrderService implements IOrderService {
    
    

    async getOrders(url: string): Promise<[IOrder[], string]> {
        let orders: IOrder[] = [];
        let errorText: string = '';
        
        try{
            let response: AxiosResponse<any> = await axios.get(url);
            if(response.data){
                orders = response.data;
            }      
        }catch(e){
            console.log("message: "+e.message);
            errorText = e.message;
            if(e.response){
                console.log("status: "+e.response.status);
            }        
        }
        let resultTuple: [IOrder[], string] = [orders, errorText];    
        return resultTuple;
    }




    async getOrder(url: string): Promise<[IOrder | null, string]> {
        let order: IOrder | null = null;
        let errorText: string = '';
        try{
            let response: AxiosResponse<any> = await axios.get(url);
            if(response.data){
                order = response.data;
            } 

        }catch(e){
            console.log("message: "+e.message);
            errorText = e.message;
            if(e.response){
                console.log("status: "+e.response.status);
            } 
        }

        let resultTuple: [IOrder | null, string] = [order, errorText];    
        return resultTuple;
    }


    


    async deleteOrder(url: string): Promise<string>{
        let errorText = '';
        try{
            let response: AxiosResponse<any> = await axios.delete(url);
            console.log(response.data);     
        }catch(e){
            console.log("message: "+e.message);
            errorText = e.message;
            if(e.response){
                console.log("status: "+e.response.status);
            }        
        }
        return errorText;
    }



    
    async postOrder(url: string, data: INewOrder): Promise<string> {
        let errorText = '';
        try{
            let response: AxiosResponse<any> = await axios.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'   
                }
            });
            console.log(response.data);
        }catch(e){
            console.log("message: "+e.message);
            errorText = e.message;
            if(e.response){
                console.log("status: "+e.response.status);
            }       
        }
        return errorText;
    }
}
