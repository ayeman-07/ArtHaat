import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    
    const [search, setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);

    // this is used to store the cart items whe the add to cart button is clicked
    //This is stored in context file because we want to access this data in the cart page and some other places also
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);

    const [token,setToken] = useState('');

    const navigate = useNavigate();


    const addToCart = async (itemId,size) => {

        // If the size is not selected, show a toast message
        if(!size){
            toast.error('Please Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            //If the item is already in the cart, with the same size, increase the quantity
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{

                //If the item is already in the cart, but with a different size, add the item with the new size
                cartData[itemId][size] = 1;
            }
        }
        else{
            //If the item is not in the cart, add the item with the size
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);


        // If the user is logged in, add the item to the cart in the backend

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/add', {itemId, size}, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message);
                
            }
        }
    }


    const getCartCount = () =>{
        let totalCount =0;

        for(const items in cartItems){
            
            for(const item in cartItems[items]){

                try {
                    if(cartItems[items][item]){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
                
            }
        }
        return totalCount;

    }

    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity; 
        setCartItems(cartData);
        

        // If the user is logged in, update the cart in the backend
        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update', {itemId, size, quantity}, {headers:{token}})


            } catch (error) {
                console.log(error);
                toast.error(error.message);
                
            }
        }
    }


    const getCartAmount =  () => {

        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            
            const response = await axios.get(backendUrl+'/api/product/list');
            if(response.data.success){
                setProducts(response.data.products);
           
            }
            else{
                toast.error(response.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }


    // this function is used to get the cart items from the backend when the user logs in or the page is refreshed
    const getUserCart= async (token) => {

        try {
            const response = await axios.post(backendUrl+'/api/cart/get',{}, {headers:{token}});

            if(response.data.success){
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
        
    }
    useEffect(()=>{
        getProductsData();
    },[])

    useEffect(()=> {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    },[])
         
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token, setToken,
        getUserCart
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;