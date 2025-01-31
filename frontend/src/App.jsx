import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Product from './pages/Product'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import './../node_modules/react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'


const App = () => {
  return (


    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] dark:bg-gray-800 dark:text-white'>
      <ToastContainer/>
      {/* Here Navbar is a child component of App, so we import it at the top of the file and render it inside the App component, so that it appears on every page of our app. */}
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/about' element = {<About/>}/>
        <Route path = '/collection' element = {<Collection/>}/>
        <Route path = '/contact' element = {<Contact/>}/>
        <Route path = '/cart' element = {<Cart/>}/>

         {/* Note that for the product route, we are using a dynamic route parameter called productId because we want to display a different product based on the productId in the URL. */}
        <Route path = '/product/:productId' element = {<Product/>}/>
        <Route path = '/place-order' element = {<PlaceOrder/>}/>
        <Route path = '/orders' element = {<Orders/>}/>




        <Route path = '/verify' element = {<Verify/>}/>



        
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
