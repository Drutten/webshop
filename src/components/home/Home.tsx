import React from 'react';
import './home.scss';
import Products from '../products/Products';
import { IProductService } from '../../services/ProductService';


interface IHomeProps {
    service: IProductService;
    onReload(): void;
    toggledReload: boolean;
}
 
function Home(props: IHomeProps) {
    return (
        <div className='home'>
            <h2>Movie Shop</h2>
            <Products service={props.service} toggledReload={props.toggledReload} onReload={props.onReload}/>
        </div>
    );
}
 
export default Home;