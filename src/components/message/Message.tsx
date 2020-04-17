import React from "react";
import './message.scss';


interface IMessageProps {
    children: React.ReactNode;
} 


export default function Message(props: IMessageProps) {

    return(
        <div className="message">
            <div>{props.children}</div>
        </div>
    )
}
