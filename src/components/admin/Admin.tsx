import React from "react";
import { IOrderService, OrderService } from "../../services/OrderService";
import { IOrder } from "../../interfaces/iorder";
import './admin.scss';
import '../../shared/styles/buttonclasses.scss';
import tape from '../../shared/images/frulle.gif';
import Order from "../order/Order";

interface IAdminProps {
    toggledReload: boolean;
    isLoggedIn: boolean;
    onReload(): void;
    onLogIn(): void;
}

interface IAdminState {
    orders: IOrder[];
    loading: boolean;
    hasError: boolean;
    errorText: string;
    notFound: boolean;
}

class Admin extends React.Component<IAdminProps, IAdminState> {
    constructor(props: IAdminProps){
        super(props);
        this.state = {
            orders: [],
            loading: false,
            hasError: false,
            errorText: '',
            notFound: false,
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    private orderService: IOrderService = new OrderService();

    
    componentDidMount(){
        if(this.props.isLoggedIn){
            this.fetchOrders('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=707');
        }    
    }


    componentDidUpdate(prevProps: IAdminProps) {
        //on navbar click current page and when logged in
        if(this.props.toggledReload !== prevProps.toggledReload){
            this.setState({
                hasError: false,
                errorText: '',
                notFound: false
            });
            this.fetchOrders('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=707');    
        }
    }


    async fetchOrders(url: string) {
        this.setState({
            loading: true
        });
        const resultTuple = await this.orderService.getOrders(url);
          
          const fetchedOrders: IOrder[] = resultTuple[0];
          //console.log(fetchedProducts);
          const errorMessage: string = resultTuple[1];
          //console.log(errorMessage);
          if(fetchedOrders.length){
            this.setState({
                orders: fetchedOrders,
                loading: false
            });    
          }
          else if(errorMessage){
              this.setState({
                hasError: true,
                errorText: errorMessage,
                loading: false
              });
          }
          else{
              this.setState({
                  notFound: true,
                  loading: false
                });
          }
    }



    handleDelete(id: number): void{
        //Confirm
        const confirm = window.confirm(`Delete order ${id}?`);
        if(confirm){
            this.handleDeleteOrder(id); 
        }            
    }


    async handleDeleteOrder(id: number) {
        this.setState({
            loading: true
        });
        const message = await this.orderService.deleteOrder(`https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${id}`);
        if(message){
            this.setState({
                hasError: true,
                errorText: message,
                loading: false
            });   
        }
        else{
            const updatedOrders = this.state.orders.filter(item => item.id !== id);
            this.setState({
                orders: updatedOrders,
                loading: false
            });    
        }
    }



    getBackground(idx: number): string{
       return  (idx % 2 === 0)? 'light' : 'dark';
    }

    
    logIn(){
        this.props.onLogIn();
        this.props.onReload();
    }


    
    

    render(){

        if(!this.props.isLoggedIn){
            return(
                <div className="login">
                    <h3>Administration Log in</h3>
                    <button className="shop-btn movie-shop-button" onClick={()=>this.logIn()}>Log in</button>
                </div>    
            );
        }



        if(this.state.hasError){
            return( <div className="no-orders"><h3>{this.state.errorText}</h3></div> );
        }
    
        if(this.state.notFound){
            return( <div className="no-orders"><h3>No orders</h3></div> );
        }
    
        if(this.state.loading) {
            return (
                <div className="wait-wrapper"><div><img src={tape} alt="loading"></img></div></div>
            );
        }
        
        return(
        <div className="admin">
            <h3>Orders</h3>
            <div className="order-wrapper">

                {this.state.orders.map((item, idx)=>{
                    return (
                        <Order key={item.id} order={item} onDelete={this.handleDelete} backgroundClass={this.getBackground(idx)}/>
                    ); 
                })}

            </div>
        </div>    
        );
    }

}
export default Admin;