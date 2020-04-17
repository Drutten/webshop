import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './orderdetails.scss';
import tape from '../../shared/images/frulle.gif';
import { IOrder } from '../../interfaces/iorder';
import { Link } from 'react-router-dom';
import { OrderService, IOrderService } from '../../services/OrderService';
import Message from '../message/Message';



export default function OrderDetails() {
    
    
    
    const defaultOrder: IOrder = {
        id: 0, 
        companyId: 0, 
        created: '', 
        createdBy: '', 
        paymentMethod: '', 
        status: 0, 
        totalPrice: 0, 
        orderRows: []     
    }
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [order, setOrder] = useState(defaultOrder);
    let { id } = useParams();
    


    useEffect( () => {

        const orderService: IOrderService = new OrderService();

        async function fetchOrder(url: string){
            const resultTuple = await orderService.getOrder(url);
            const fetchedOrder: IOrder | null = resultTuple[0];
            const errorMessage: string = resultTuple[1];
            if(fetchedOrder){
                setOrder(fetchedOrder);
                setLoading(false);
            }
            else{
                setHasError(true);
                setErrorText(errorMessage);
                setLoading(false);
            }    
        }
    
        fetchOrder(`http://medieinstitutet-wie-products.azurewebsites.net/api/orders/${id}`);
        
    }, [id]);


    

    function getDateString(isoDate: string){
        const date = new Date(isoDate);
        let newDate = new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
        const offset = date.getTimezoneOffset() / 60;
        const hours = date.getHours();
    
        newDate.setHours(hours - offset);
    
        return newDate.toLocaleString();
    }


    function getQuantityWord(amount: number): string {
        return(amount === 1)? `item` : `items`;
    }


    function getBackground(idx: number): string{
        return  (idx % 2 === 0)? 'light' : 'dark';
    }

    


    if(hasError){
        return(

            <div className="details">
                <Message>{errorText}</Message>
                <Link to="/admin" className="link"><span>Back to Orders</span></Link>
            </div>
             

        )
    }
    
    if(loading){
        return(
            <div className="wait-wrapper"><div><img src={tape} alt="loading"></img></div></div>
        )
    }
    return(
        <div className="details">
            <h3>Order: {order.id}</h3>
            <div className="order">
                <div>
                    <p>Order id: {order.id}</p>
                    <p>Customer: {order.createdBy}</p>
                </div>
                <div>
                    <p>Payment method: {order.paymentMethod}</p>
                    <p>Date: {getDateString(order.created)}</p>
                </div>
                <div>
                    <p>Order status: {order.status}</p>
                    <p>Total price: {order.totalPrice} SEK</p>
                </div>    
            </div>

            <div className="order-rows">
                <h4>Order rows</h4>
                <div className="order-rows-wrapper">{order.orderRows.map((item, idx)=>{
                    return(<div key={item.id} className={`order-row ${getBackground(idx)}`}>
                        <p><b>Id: {item.id}</b></p>
                        
                        <p>Product id: {item.productId}</p>
                        <p>Amount: {item.amount} {getQuantityWord(item.amount)}</p>
                        <p>Order id: {item.orderId}</p>
                        
                    </div>);
                })}</div>
            </div>    
            
            <Link to="/admin" className="link"><span>Back to Orders</span></Link>

        </div>    
    );    
}






