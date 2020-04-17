import React from 'react';
import { IOrder } from '../../interfaces/iorder';
import { Link } from 'react-router-dom';
import './order.scss';

interface IOrderProps {
    order: IOrder;
    onDelete(id: number): void;
    backgroundClass: string;
}


export default function Order(props: IOrderProps) {


    function getDateString(isoDate: string): string{
        const date = new Date(isoDate);
        let newDate = new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
        const offset = date.getTimezoneOffset() / 60;
        const hours = date.getHours();
    
        newDate.setHours(hours - offset);
    
        return newDate.toLocaleString();
    }


    return (
        <div className={`order ${props.backgroundClass}`}>
            <div className="order-text-row">
                <div>
                    <div className="order-text-col">
                        <div>Order id</div>
                        <div>{props.order.id}</div>
                    </div>
                    <div className="order-text-col">
                        <div>Customer</div>
                        <div>{props.order.createdBy}</div>
                    </div>
                </div>
                <div>
                    <div className="order-text-col">
                        <div>Date</div>
                        <div>{getDateString(props.order.created)}</div>
                    </div>
                    <div className="order-text-col">
                        <div>Balance</div>
                        <div>{props.order.totalPrice} SEK</div>
                    </div>
                </div>
            </div>
            
            <div className="buttons">
                
                <Link to={`/admin/${props.order.id}`} title="View" className="link"><span >&#128065;</span></Link>
                <span title="Delete" onClick={()=>props.onDelete(props.order.id)}>&#128465;</span>
                
            </div>
            
        </div>
    );
}