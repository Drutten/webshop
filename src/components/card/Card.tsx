import React from "react";
import './card.scss';

interface ICardProps {
    image: string;
    name: string;
    price: number;
}

export default function Card(props: ICardProps){
    return(
        <div className="card" >
            <div className="card-image">
                 
            <img src={props.image} alt={props.name}></img>
                
            </div>
            <div className="card-title">
                {props.name}
            </div>
            <div className="card-price"><b>{props.price}</b> kr</div>
        </div>   
    );
}