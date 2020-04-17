import React from 'react';
import { render } from '@testing-library/react';
import Products from './Products';
import IProduct from '../../interfaces/iproduct';
import { ProductService } from '../../services/ProductService';
import { BrowserRouter } from 'react-router-dom';

let products: IProduct[] = [
    {name: 'Notting Hill', id: 1, description: '', imageUrl: '', price: 100, year: '', productCategory:[]},
    {name: 'Pride and Prejudice', id: 2, description: '', imageUrl: '', price: 100, year: '', productCategory:[]},
    {name: 'Annie', id: 3, description: '', imageUrl: '', price: 100, year: '', productCategory:[]}
]


let tuple:[IProduct[], string] = [products, ''];


test('renders products', async() => {
    const service = new ProductService();
    service.getProducts = jest.fn().mockResolvedValue(tuple);
    const { findByText } = render(<BrowserRouter><Products service={service} onReload={()=>{}} toggledReload={false}/></BrowserRouter>);
    expect(service.getProducts).toBeCalledTimes(1);
    const productElement = await findByText(/annie/i);
    expect(productElement).toBeInTheDocument();
}); 
