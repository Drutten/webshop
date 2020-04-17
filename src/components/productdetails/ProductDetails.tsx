import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './productdetails.scss';
import '../../shared/styles/buttonclasses.scss';
import tape from '../../shared/images/frulle.gif';
import IProduct, { IProductCategory } from '../../interfaces/iproduct';
import { IProductService, ProductService } from '../../services/ProductService';
import { Link } from 'react-router-dom';
import Message from '../message/Message';




interface IProductDetailsProps {
    onAddToCart(product: IProduct): void;
}


export default function ProductDetails(props: IProductDetailsProps) {

    const categories: IProductCategory[] = [];

    const defaultProduct = {
        name: '',
        id: 0,
        description: '',
        imageUrl: '',
        price: 0,
        year: '',
        productCategory: categories
    }


    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [product, setProduct] = useState(defaultProduct);
    let { id } = useParams();
    


    useEffect( () => {
        const service: IProductService = new ProductService();
        async function fetchProduct(url: string){
            const resultTuple = await service.getProduct(url);
            const fetchedProduct: IProduct | null = resultTuple[0];
            const errorMessage: string = resultTuple[1];
            if(fetchedProduct){
                setProduct(fetchedProduct);
                setLoading(false);
            }
            else{
                setHasError(true);
                setErrorText(errorMessage);
                setLoading(false);
            }    
        }

        fetchProduct(`http://medieinstitutet-wie-products.azurewebsites.net/api/products/${id}`);
               
    }, [id]);




    function handleAdd(e: React.MouseEvent<HTMLElement>) {
        props.onAddToCart(product);
    }

    

    
    if(hasError){
        return(
            <div className="detail">
                <Message>{errorText}</Message>
                <Link to="/" className="link"><span className="shop-btn movie-shop-button">Back to Home</span></Link> 
            </div>
        );
           
    }
    if(loading){
        return(
            <div className="wait-wrapper"><div><img src={tape} alt="loading"></img></div></div>
        )
    }
    return(
        <div className="detail">
        
            <div className="detail-wrapper">

                <div className="text-wrapper">

                    <h2 className="detail-name">{product.name}</h2>
                    <p><b>{product.year}</b></p>
                    <p className="detail-description">{product.description}</p>
                    <p>Price: <b>{product.price}</b> SEK</p>
                    
                    <button onClick={handleAdd} className="shop-btn movie-shop-button">Add to cart</button>
                    <Link to="/" className="link"><span className="shop-btn movie-shop-button">Back to products</span></Link>
                        
                </div>

                
                <div className="detail-image">
                    <img src={product.imageUrl} alt={product.name}/>
                </div>

            </div>
        </div>
       
    );
    
}






