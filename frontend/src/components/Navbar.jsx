import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Moon, Sun } from "lucide-react"; 

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  // This is a state variable that will be used to toggle the visibility of the dropdown menu, when the size of screen is small and we need to show the menu items in a dropdown.

  const location = useLocation();
  // We are using the useLocation hook to get the current location of the page.

  //It will be used so that we can hide the search icon (note that here we are hiding the search icon) when we are on any other page except collections page.

  // This fearure was added by me, in the video tutorial, the search was always appearing it was just not functional, on other oaages except the collections page.

  // But I made it so that the search icon is only visible on the collections page.

  const [searchIconVisible, setSearchIconVisible] = useState(false);


  // Adding toggle button for dark mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  

  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname.includes("collection")) {
      setSearchIconVisible(true);
    } else {
      setSearchIconVisible(false);
    }
  }, [location]);

  const { setShowSearch, getCartCount , navigate, token , setToken, setCartItems} = useContext(ShopContext);

  const logout =  () => {
    navigate('/login')
    localStorage.removeItem('token');
    setToken('')
    setCartItems({})

  }

  return (
    <div className="flex items-center justify-between py-5 font-medium dark:bg-gray-800 dark:text-white">
      <Link to="/">
        <img src={assets.new_logo} className="w-36 h-20" alt="" />
      </Link>

      {/* hidden: Hides the <ul> element completely on extra-small screens (by default, screens under 640px wide). */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {/* Navlink automatiacally adds the active class to the current pages link */}

        <NavLink to="/" className="flex flex-col items-center gap-1  dark:text-white">
          <p>HOME</p>

          {/* Whenever the home page is active then the hr element will be displayed, else it will be under the current page.
    hidden class is added so that it is visible only when it is active which is a class automatically added by Navlink and defined in index.css file that what should happen when active */}
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-white" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1 dark:text-white">
          <p>COLLECTION</p>

          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-white" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1 dark:text-white">
          <p>ABOUT</p>

          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-white" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1 dark:text-white">
          <p>CONTACT</p>

          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-white" />
        </NavLink>
      </ul>

      {/* This div contains the search icon, profile icon, cart icon and menu icon. */}

      {/* Icons section */}
      <div className="flex items-center gap-3">

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-4  rounded-full bg-gray-300 dark:bg-gray-700"
      >
        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

        {searchIconVisible && (
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer dark:invert"
            alt="Search"
          />
        )}



        <div className="group relative">

        
          <img
            onClick={() => token ? null: navigate('/login')}
            src={assets.profile_icon}
            className="w-5 cursor-pointer dark:bg-white"
            alt=""
          />

      
          

          {/* ---------Dropdown Menu----------- */}

          
        
          
          {
            token && 
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
          }
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Sidebar menu for extra small screens */}

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            <p>HOME</p>
            <hr className="w-12 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            <p>COLLECTION</p>
            <hr className="w-12 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            <p>ABOUT</p>
            <hr className="w-12 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            <p>CONTACT</p>
            <hr className="w-12 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
