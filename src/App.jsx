import { Route, Routes,Navigate,useNavigate} from "react-router-dom";
import {useState,useEffect} from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


import './App.css'
import NavComponent from "./components/NavComponent";
import Home from "./pages/Home"
import ProductList from './pages/ProductList'
import Login from './components/Login.jsx'
import AuthContainer from './components/AuthContainer.jsx'

import CartPage from './pages/Cart'
import AdminAddProduct from "./admin/AdminAddProduct";
import { createContext } from "react";
import ProductView from "./pages/ProductView";
import Medibox from "./components/Medibox";
import ContactUs from "./components/ContactUs.jsx";
import para from '../src/images/para.jpeg';
import amox from '../src/images/amoxx.jpg';
import ator from '../src/images/ator.jpg';
import azithromycin from '../src/images/azithromycin.webp';
import doxycycline from '../src/images/doxycycline.webp';
import losartan from '../src/images/losartan.webp';
import metfor from '../src/images/metfor.webp';
import omepraz from '../src/images/omepraz.avif';
import panto from '../src/images/panto.jpeg';

import ibup from '../src/images/ibup.jpg';
import amlo from '../src/images/amlo.webp';
import rm from '../src/images/rm.webp';

import { CartContext,CartProvider } from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import AboutUs from "./components/AboutUs.jsx";

import Payment from "./components/PaymentPage.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginAdmin from "./pages/AdminLogin.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Checkout from "./pages/Checkout.jsx";
import FAQ from "./components/FAQ.jsx"
import Shipping from "./components/Shipping.jsx"
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import Terms from "./components/Terms.jsx";
import Profile from "./components/Profile.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import { ForgotPassword } from "./components/ForgotPassword.jsx";
import { ResetPassword } from "./components/ResetPassword.jsx";
import WishList from "./pages/WishList.jsx";
import Navbar from "./components/Navbar.jsx";







export const themeContext = createContext();

export default function App(){

  const api = axios.create({ baseURL: "http://localhost:3001" });
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = token;
    return config;
  });
  

  const [favourites, setFavourites] = useState([]);
  const [productUsers, setProductUsers] = useState([]);
  // const [setNewProductUser] = useState({
  //       userEmail: "",
  //       productId: "",
  //       Active: "",
  //     });

  useEffect(() => {
    fetchProductUsers();
  }, []);
  useEffect(() => {
  setFavourites(productUsers);
}, [productUsers]);


  const [user, setUser] = useState(() => {
  try {
    const storedUser = localStorage.getItem("User");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    // console.error("Failed to parse user from localStorage:", error);
    return null;
  }
});

 

  const navigate = useNavigate();

  const productslist=
  [
  {
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhUTEhIWFRUXFxYZFRcYFx4WFhkYGBUYGBoXGBoYHSggGB0lHRodITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy8lICYtLS0tLS8tLS0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYBBwj/xABJEAACAQIEAwQGBgcGBAYDAAABAhEAAwQSITEFQVETImFxBjKBkaGxByNCUnKyFBUzYsHR8IKSosLS4SRDc/FEVGN0k7MXJTT/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/8QAOxEAAgECBAMFBQYEBwEAAAAAAAECAxEEEiExE0FRBSJhcZEUMoGh8CNCscHR4TNSYvEGFRYkQ3KSov/aAAwDAQACEQMRAD8A9xoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoAoDgNcugdroCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgCgGsTiUtqXdgqjcn+vhXG7asGM4z6TPdlLMon3tnb/SPj5bVnlVzaIsUbEG5fW1bDlWYALoi5m2GsDkOZrz1Bzm4p2NLaUdgXj9tTBN5dWH7O5HdMHVQRV3s1Zap/Mjng+XyLe1jLkAi48EAjU7HXY7VVxJrmdyxfIkW8fe++fgfmKkq9TqcdOPQkJxK796fYKmsRU6keFEkW+I3P3fd/vU1ipnHSQ+mObmBU1iZdCLpId/TP3fjUvafA5w/EP04dDUvaV0OcJnP1inRvd/vT2qHiOFI5+tLXUj2H+ArvtNPqOFI7+tLP3x7ZHzqSxFN8znDl0Jgq4gFAFAFAFAFAFAFAFAFAFAFAFAFABoDzrjmIuXL752JCOyoOQAJGg6+NZJ3b1LY2SIUAEDSSJA5kDcxRRO3J15HKBUyyTbDZpjsyQLkRrmyTHjFYYuKqNy+XXkXu7jZGbwdp0/R7lrCYd2ZriK2e5b79u7dHqwy21ypnGrag7QK9Ko4yzRnN2VntcoV1ZpGyuuQpIEkCQP63ryjSdt3pygCSwkRtpEyeQ1HjQD+FuFhJEGSPcSJqSIsmW6kjhISpI4x2us4VhxN1iHt5WtECJIBEAggydNYMbiCNOcG5choRm4g8963AgkZSHOh37p6cuoO8VBya5E0kR7mMndnQ84RcumhgmSRPvqOa5NITauMw11EnKYyyAYOYfZIII8a5HxOOxuhXurYwHa6AoAoAoAoAoAoAoAoCDxTitqwsudT6qjVm8h/HaoSmo7nUmyFa9IVO9tvYQay+2x5plvAfUeXjtv7rj2D+dSWMp+I4Mh5eL2TzI/smprFUyPCkOrxC0ft/Aj5ipcem+Zzhy6HnnHFum8/ZFQGu3MzndVkwVGsknw91cjlvdh32I+B4ciHPJe4RrcY6mYmANANBU3Ny8jliRxnENbshlbKc1sTmVdzES2nsGp2GtefRipVmmr7mmTagmigw/FL6hQrLEkpHYMCTOZ1CmTJLgxuXOm4r0Hhqb1a89ylTa+kaPjPG7eEw4u3jLEKFUQGe4VmAJgDcnkB10nDh8LLEVeHD+yLalVU45pGHPp1inacllR9kZSSPHNmBPl6vhX0UOwcPl7zd+t/yPFqdqVU24pE5fTbGBYi0NNwhn80fCpf5Fh+svUzPtmvfZHbH0j4pRDpaJ5PlOn4lDDN7CvtqE+w6S1jJ/Xiaafas5aSSEH6W8UmjYaw0c1Z1B8pJqP+S0uUn8jRHHSe6Oj6a3HrYBT5XyPnbNQfYq5T+RcsUSMP9L2BZs17AMhO7qUuHz1Ck1RPsWa1jJE1iTd8N4thcba7WxcW6k67hlaDowPeQwTv7K8mvQnRllmrGmE1LYcuWh4+8/zrO0WJkd1jT+M/PegNcuLtn7Y99esqsLbmNxY4t1TswPtqanF7M5Ziga6mjgV0HaAKAKAKAKApfSXiz2FUIoLPME7LEaxz3qupPLsSirmIuszku7FmO7Hf/YeFZ7N7lmiO8dSVSO0BBAzodFDvbtkMM6zJcEbkZGjXenDNZmnbyZbU2Qv0buA9oC15nVoc3FdFB+6od2AIjUA6Zh1ruKT7rSST6HKbLlLy+XeK/wBoch1rJcsJOHcHUdSOmxg1JHCj4q+XtWG4LR0kmB8TW2cslHN4FMFmqJELgk5GU6hGgE7xlBPxJqOCbcGnyZZi0lJPqW+QEQQCNNCJHxrJOTU211Jpd1CGwNk72rZjbuLprOmmmtFVqL7z9RkXQ8x+kLEu+Pez9i0lhVHIfV9pIHL9qR5AdK+s7GpJYdVObueL2lVallNFwVBY4OWLlDexejquZgFRRA1BibZnzNaJrNirWvZGO6WGvtdkHFcPa5ZGIa6MhvdirEHOxy5pCqNvbyrRxowlkUdbX3MMcPKf2kpaXtsLX0eNnDYw3ER8Sl+zhrSlTcUO2VzkUqQzOjDKTtInLrVE8TnnG18trs9OjhskXm3MdxDgl5Q5BR+zurZuhGJ7O4xIVWkAEFgVzKSJBE1b7TBLXTS5KNCXIg4n0dxQ7TuKeyKi9DqezzAlS+sBTB19h3E1RxtGSi099tNzTwZR0ZIwPordLOt4PbZLmFTL2ZcN+kOAPrVlE7pDAknNMCq6uNio3hZ6N79PDclCld2Y9wvjH6s4i7WWY2Uum3cUmS9tWysGgCSCCQY3A9tcqXteFUqi7zVyV+HUtE94sm5B7Qode6UmCpAIJDbH3javlZ5b6HoQvYbeqmSLJKsIsk26mjjEYq9lGilj91fWjmfIT8RXG7HCHc4koic6T1BUDSd/ZUeJbqSy3IzcVaJV9P8AqQfKDp8ajxpLZ/M7w1zRa+j+Ldy2ZiRA0O4MnQ9DWzC1JTbuymtFRtYvK3FAUAUBlfToNlt5AC31mXNIWYWJI1iq5+JKJk8Lgu9ne4bjiR0RdNQFGkwdzrtXMyatH9zrTWrFekF64OzVNQ0yIkFlZCknKY70GZG2x5Y8LCDcnLcvqNpKwrgPE3c3TdZAqqGY6AzMFjHKABt/KpYijFWybvQ5GT1uZ1vTfEX7jfomGzW11kq7XCo0Dt2Z+rGvOd4Jr16XYdJQTrT1fTT+55tbtGalamr2HbvppjrYhrdtGHVGB9oLc60R7Cw7Wkn8jE+2K17ZUX2KvG7he0YAG4ltiBsC5UmJ5a14+NpKFOUFtt8z2sLNykpCuDr+1AEAXSAOgCrpUcPFKU1Ha/5Fld3UG97FotedU99+ZdD3ULFQJGD+kHheW8MSB3HCq56OvdWfNYA8V8q+q7DxMXTdF7rVeR4Ha1CbfEjtzIycVS7greEZshtXWuK0ZlZXzSDBlWBYxyI6V63ClGs6kVe6PNdWLoqnPSzHbnFLK2MFZ7xFrEPdvnLBKm4CIEkE5J0nkKhwJuc5NbqyJRr08kIp7PUsrvpfgxdt3CSf/wBlcxFwZGkWuwexbfUanKVbKNREVk9kq2a/pt+dj0Y4qn8yi4XxHDW7GIt3cRb7S/jcPcaJK9jbvdqWzRGpB0GozCd6hi6VScO5F6Rt8TRQlFSu3zKDEcStHB8QHaL2mIxaQs942kYuHjmJqEMPNVKSy6Rh8y51IuMnfdm9PHsE+IyjE2ijY/DAHOI7GzglKP8AhN0ZZ5HevL9mrqN8rvlfzZJSjc8tDG473CD32d4O/fYtB99fVUo5IKPRHkYipebt1PoLhqFbFpTuqKPcIr4Ws05trqfQ0/dVxRGtVcyT0Rgh9I+JQkPbtNqYMERrzAbvD2ivqH2HSsmpM8OPac3Jpoa//MGIT1sHZb8Nx1+YNH2JDlN+hfDGuW6Et9MwYjPw4EjZlxJVhO8Hs516TrAqqXYif3y5Yk2Hox6Y4HiEpaDW7oGY2ngOQIJZGU9+IE6zpqIrzMVgKlBXlt1NFOspFvew69P4/OvPyovTLH0d9d/wj5mteD95lNfZF/XoGcKAKAz3pas9l5t/lqMkdRieCSTcJ5hWPiS1zX3QPZWDBZryvz1NmKtZWL1DWOW7JLYovpB7Q8PuhSZzWZ/D2yT/AAr0uyEniop+P4GbGSy0WzMeiii1geIXCASUw1uCSARcukNMEGPbX1NeGarTj5nz1KrelNkzAcJsX1wgaVOJbFTDaIllSQVncyp36R40qYicXK20bfMhQw0Got7u/oafhuHzYW0jCJsWgRuQezXY9QflXhYmMajlHqe7Qk6aT6CMJfs2UW291M+zDNLM7d7QbtoR7IqvDUHTgo79S2tUU5tlmtePU9+Xmao7IWKgSO3bKupR1DKwIZSJBB5EHQ1OMnF3i7Mi1dWZmMd6G4VO+rPbB+ypzD2BgT/ir03/AIirYeneaUvxMD7Fp4idouxAu+i9ptrjjzAP8qzf60lzpL1LP9Kwj/yfIab6PCwnt4HUovNS3O4OQn2HpWyP+KZtXdD/AOkVPsSEXZVPkyFf+iy8fVxA9tkgcuYuHrU/9UdaEvVE12XFf8iIF76Lry74lAf+m3QHr4iq5f4sow9+lJehfDsqUvdkmVPFvQnEYe21wvbuIoJbJmzAdSrKNOsE+6t+B/xDhMVNU43jJ7X/AFKcR2bXpRzboufo+9H7uIdbjWytpTKsdnYbZRGqA6ltjAXc6ae0sfGlB04+8/kYMPg801NvRHsDKAIGwEDyFfJs9ojsda4veQezMhhfR5Qly0jG22K/Q1NwNDWs1u5ibyrpJGVAYnUEA7V9a8Q24ve1/wBEeJCjFJ+JgL3BLLYa3ipuJbuWsVcCEqzA4e7btr3oAhjcA20KnlVtbFzpzVOybbS9S6lho6voTuG+g1t8QbfaluzuYPtEbQFcRba41vMusqFPeG45A1mn2lJRvbe9vgW8FJlRxcGxewlzChbbrh8PeBG5d81wFju3dIGu4q/CxdenNTd020RrTVNxPd8I4a0rgsQ6hxmMkZgDlnoNq+Tqq0mj0YbFp6O+u/4R8zV+D96RXW2Rf16BnCgCgKD0p/5Xm3+WuWBkeEYRlzlhGoQeKpPe8jm+FZ8NTlG7l5ehfXmmko+fqWSV5ct2aVsKvWVdGRxmVgVYdQdDU6c5U5KcXqiM4qUcr2Zhr3opjLDsbD9pbIjfI2WZi4D3WA0MzuJgV9RR7aw9SP26s1ztoeBW7Lqwb4DvciYnA8R7pAYlA4SLiNlFyc4HePrZjPnUv857Kd1xFr5lUOze0VZuD08jQ3LN5kTOt94tWc4F0WLWbswHl1hp3nKYBXQTvnzwk80GrPY9JRklaW43gyO0VEu4ay0kBbKdvc0zFputoAQI1G48a49r2bOmxHolmAu2rzIzgMQdVlhJAIggSec149XAJycoSszZDEtK0kNPw3FW/WTOOqa/Aa/Cs0qFaG6v5FiqQexy28+B6HeqlNXs9GSsMcSw7MoK6lZ08D091Z8bRdWnaO6NOFqxpz7xGsWreQZs+bNrAkZfl/2rzoYanw++pZvBM1Srzz3g1bzJC3LXqm620ZSOUOANv3o/tH2XWilbNK3S3n4FDcm72j6+XiSu3G/audRuvInXl3o/7UlU/rlv/Ly9CtQ/pXrz9SNiTbeAb2qgxK6x0AH8etV1I06qWeb06oupOcG8sN/ErbmFLMUTvToDGhkc+Ua1XSoS46VPZW1NVSquC3PR66Gr7JVkKIH8tpJr6NnhpEHFYtF3b2DWqZVYrQsUWRA2JuH6nDsR95hC/GB8TSKqSacY6dRJwS1Z5viMPxaZQP3XDrrb9ZbfYq2p1+rGSDII3mvq49qdl2s6kdtd/rc8T2PHJ+67FNxHB8YNoWDZuG0FKBEs24Cs4uFQbayJYA78qLH9l1JKfFi35vyNEaGJirZWJTiHGrbtcNi8rM63HJw5AzJZeyDosAZHOnUA8qko9n1EoqcenvLrclJVlduL9BjhyXcdiFDENdYW0OUQAlu2tvNA0HdUHTcnTUgVsvSwlFvZa+p59RVK01ZaHu6WsiKg2VQPcIr4ucs0m2e9FWViw9HfXf8ACPma0YP3mV1tkX9egZwoAoDMenLXAlrs5nM05UDmMuujEAcu8TA6GalHc4Yi0+e4surMCD9ZdN06d6Ozw4FteZGY6HLvtVr0Rw1zejmJTW3dW6p1yvownkDz+FeHPBVIu8Xc2xrx5oaa3cX9pbZPGJX+8NKokpw99WLE4vZiMbbZrZC76GOscv66VnxEHVpOMNy6hNU6ilIhWLCgKSzKwJnuEgRqu39a15cMJZJu6l5XN1TEXbSs15ncdgbN1g1y2lyJy5h3QDrop0Ht2r7WhNxpR8vI+eqLvsVhLiG2ptwEI0AECNthUoVFNZkcnBxdmbnh37K3+BPyihwkUA3ew6N6yg+YqE6cJ6SRJSa2IN/hCH1SVPvHx1+NZZYGP3G0Wqu1vqV1/A30+wLg/dMH3Hf2VnlQrQ5X8iaqQfgM2sZbnKxyN91xkb3Nv7KrU9bPR+JOxObKolsqjq0Ae81ZfqQsR1xtltLaG6eqW5H94iPjXFPN7qv5I7a2+hJs4S82uRLX+JvhpVioVpdI/MjngvEk/qhT67M3wHwqyOBj99tkeO+WhJsYC0nqooPWJPvOtaYUacPdRVKcnux9qslsziMNYuqoC9rprpkIOu/PXUn3V8mk4aXdtfuvqexPva210+8iQcV1ZNQZJtmN+eusyfKoucs1nb/yyGRdH/6RVYq2PWRwxJ2UHnJn2GsdTDW70Xd32sz0aNb7slbTqiw4DwOzYU3FtKly4S1wgQSSxIn3zGwkwBX0katZ0oRqybsuZ4tSMOJJwQ9iMWg0EsfuqMx+FVOa5a+RLLpqWHo0t7O5ey1tSoyltyZM93cVtwcZ3bkrFFeUWkkzRV6BnCgCgM96X2ldbauoZSWlWEgxlI0PjXU7HDM4TFq4dUEBGKwNARGjADkTI9lU068arduTsW1KTp2vzPRLZ0HkPlVlysVXARb2AtNuoHiNPlVM8NTny9CxVJLmV97hNxdbbhv3X0/xL/Ks0sHNe47+f6lirJ6NGV44zBL3JtQdZ1LZSJ57nWrsS5Rw762OUEnVRA9G8wtMCIGcwOgKrPxqrs6/CafXQtx1s6selcPP1Vv8CflFbG9TISK7cBXbg7XThWpxdc+UowXObYfTLnHLQyJ8RWVYtZ8rTSva/K5oeHeW6ava9vAaxfErLKVe0X79xShCt+zUsW1MQQBH4hUZ4mm1aUb6tW8hGhLdPp8yM2GwNvs2GGBZ9UUKGI7oJgMYBg7D2VGXAhleXV7EoxqTus2iLD9bWg2SGgMEz5fqw5iFnrJjpOlW+1U08tnba9tL9CHs82r/ABtfW3Uew2OVwpUHvZokfdMGelWQqqVrcyuVNxvclTVlyJyuXBwmlwUD2r9v1rZYfetnN71MN7prznSqx3V/I0KcWKtYlj6lm6x8UNse03cvwmkVN7J/h+IbiuZJTB329YpbHRfrG95gD3VYsPVlu0vmR4kVsrkleGW/tS/4j/AaVbHB0172vmRdWXLQk2bKroqgDwEVojGMdkVtt7jlSRw7XQFAFAUHpUf2Xm3+WuNnUYT0fgC7Eycs+A70fx+FeZ2flWbqbcZe0bnqlo6DyHyrbmMdhc1NM4dqRwpUGINxwM4BLg5tECkjKUME5gJOmmmsaVj+1c2lfnvt4WNT4agr25bb+NzI8cZil3MO9qW8wwLfI1zEuTw7vvYUUlWVtiH6POTbboGheWgUDl4zPjUcBOUqbv8AAnjYpTXzPScAfqrf4E/KK0ZtTKkSA1STFiNe4laVirEyNxlJ5A8hrv8APoajKvCDs2SjSlLYbPGrAEl4jqrDcEjQj90+0RvXPaqS1bO8Co+RBFrDl3zXSyhmutay6SQASYWWHeED5xWdRpOTbldb2L3Kooq0bPa525ZwwdnDkZ7OUKFJChoTMABucoEfu1106Kk5X3W35nFOq4qNtn+4nEWMM9vs1uKNVDnIGztkCq2o3hdGG0eFKkKMoZU7ddBCdSMszXlqJNuwNP0g9lmW4UiZYEEd6JgkBiPPlVbjSXd4nd3t+5JSm1fJrtf9iVw2/btKVN9XWTlhYI1JOsnNvv4VfRqQpqzmmuRVVjKbuo26kz9ZWd+0XYH3zGnsq7j03syrhT6EnNUrkbCS1RchYp8acWDcAn1GdSveEhCgtiRMzleOs1RPj5ml5/t+Zojwsqfw/f8AIVjruKD9wEyjQqiVBGaGLFYYkR3ZEGNxNKkq6krdNvzFONJx16nMNiL2cAm7kOcKzW+9P1WUsAvdglwCQP41yE6uZJ3trq1ry/c7OELNq19Ofn+xd1uMhyai2dOqaRdwxVWHAoAoDLenOLS2LJd1QFmALGBMAxJ0GxqEr8iUUY3A4rCpnC3rcu0xnE9Ao16kx1ms9HDukpNLcvq1c9k+R6fZfQeQ+VVqoQyhiLQdcpJGo1Bg6Hb27e2rH31Y4nldymvWlBI+v3ykqdyCpzCOumvnMVlklmfvepoi3ZbAjjriAGKmTssEjSNt/gPGuxa2eY47/wBJlOMcWspfvI5IIdpGRmBDHqoI5xBjny1rbkclsUppETCcWwqgILh0gCUYElj+Hfma7Ci4QsloKlTM7s9IwLfV2/wJ+UVkz6nUtCUGqxSItDOLsKQzhFZ8ukjfKGygwCY1O3U1KSVm0rs7Fu6V9Cqi5/5VTO4ylT6gOpkgauy+w+zN3734a9PrqX93+d+vj+x0s/8A5YHMpBbKwMEtMr6w0VTG/LmK7ea/49/rzFo/z8/rw6i77HQDDd02kMlWlSG9WFkyJJga1Kbe3D0suRxLnn1u+YjM236JlBZSdGIMZonL0gDbpoRFRbe3D38Dtlup/XxHLVte6P0aJtZpKmAytmCHeBOup6CpxitFw+V/j0ItvV5+fy6jYnN//NrJIOV4BKToeQkkaba9ag739z5PoS5e9811HsNhVdofD5YA70sJmfV56EDp1qUKak+9D4kJTcVpItFUKABoAAAPAbVc3l0Kd9RLPVTmSsUpdcq64j1W8x9YAQfGq7xsve+mXWd3t9IVauAlVDYgb6n99+evKIkdQa5Fp2inI7JbytEQxAUN2mIhgNeezDadD3T4d4eEdllSunLUJO9rR0HrKF2CrcviVOp9UiAJJzadYEGpRWfROSIt5btpFwDAAJkgCT18a0OVlYotcVZbU12hK8mckrD1aSAUAUBjvpD1FkSRJuagwdl51mxE3GxfRjmuYvApcJ77XABBjOjq0cjCAjb2zUHWWXQk4M9PsPoPIfKvNhU1JuJKVq2xkuRU0PpWuDZUxGKxdu2uZ2gfH2DnXalaFNXkxGDk7I8p49dY3blxWvD6wkJbyye+TqGHjB12rJTrKT5a9TXw2kNcOa4x1vXwFIJW4qjN3p0IGoMcjtV85pLZFWW/U9IwD/Vp+BPyivKU+8WJaE22RFaoNNasrle44hq+LIseUVojoVsVpVlyNik4nx9VJSyO0fr9lfM8687FdoQpaLc00sNKe5AwfEcYsuYvL9tAAGHikbjwrHhu0pzb523RdWw8I2WxoOHcRtXlm209Rsw8xXsUq8KqvFmOcJQ3JRFWMiNmqmyVhi41ZakiyKI9xqxynqW5dCLxDjhnJYAJ2Nw+qOsD7R+FW4rtSFNZYasUsK5ayGcDxDEouZ/rrf2oAFxPGBo6/EVVhO05Sg5T1S36r9jtWhFStHT8C9wuLt3FzIwYeHyPQ17EKkakbxdzHKLi7MW5qMro6kR7rVjqyaLopBgmlj5Cu4Kd5yRystETa9IoCgCgMX9I7R2Hnc+S15+PdkjXhFdsyGEdgWB8CPIj4eXjWOEmk1L4Gmqk0mj0TDvoPIVgp1NSLWhYYZZ9letho5lczVHYb4vj+wtl94/mB8yKvr1nRg2jlGlxZqJQcPJxF0F2mSduXdJ0ny3rwYuWLxChUbt4Ho1qaw9O8VqZXiBHbXANu0cD+8RW5WirR2IJXV3zG8BfzKD/AFNW06maFyurDLKxvsA31afgT8orCp95kbaE1GrVCRBolWutbqd0rlErbHcRilQS38veeVXTqxpxvIioOTsjN4zij3zlUkLMaaEz57eZ+FeHie0Z1JZKfM9GGEUFmmSLHB7qj1PZI/nrWeXZWMlq7eo9qp7IctYW/bOYIfYQfhOtRh2bjqEs8Vr4MhKtSqKzZBxYBftEPZ3AdSNNehFZ1ialKo3s+aLo01KNnqix4bx2TkuwG69fLr/WlfQYXtKNRWkZK2ElDVbFteatdWWpnihOIZcvLwqOIlDhnYJ5ivuvXi1JmtIa/Q7KKMxeSoOkRryGlcrYfBUrcXNdq+hyNWrPaw3a7ImLd1lbYBwIPhI2qqnQwdR2ozlFvrs/AnPipXnFNeBWX7z2XLL3HHrDkfPr51XSqV8LUcHpbkaYUoV4mlwWJN20jxGYSRX0UZyq01Kx5c4KnNxDE35EVmxGIzRtYlTp2dznDGlm8h8652ZK9SXkdxKtFFnXtGQKAKAxH0l/+H87nyWvN7Q2RtwW7MbhTrz9vLcwOvn5VhpbGqrsehWG0HkK8tO02jjWhYYe+RXp4fEShsZ6lNMq/S26TYMnf/UtWYio5wdy3BxSqorvRS79dbHXN+Rqw4G/tK+P4G3tBfZN+X4mVx9z624377N7mnSr07blNtLI7hCoLZdFJkDl8fDX21fDLrl2K6qdlm3N5gG7ifgX8orylLvteJy3dLCy+o8xW6hLvIpmtC0zDea9zMrX5GOxk/TW93Vg87fzuV5WOalFWPT7NX2hD4Lclln7y+H2hXk0ta8b9UbMVG0HY0HFMQQ7DMRtzjkK0dq1pqu0pNbczzsNTTgnYqf024DKuw9unuNedSxFeDzKb9WbeBTkrNE5mGIQmALyCdPtqOX9bGOtezeOPovMvtI/MyWeGqL+VmeJm4h/eU/GvOw/vI9SduFLyN6EBA8h8q+pyRcVc+cTaZDxK5TXmYmOR2NFN3IN1q8urI1RRF4tioZB1s2z7y1WdqR+0h/1RLB07xb8StzzXnqJutZEnizZ7Nq4fW7yMeuU6H5++vVrviUKdV77ehmwyyVpQW25f8AP/Dp7fnXr4TSkkebif4rDiDd72CsGPlaXwJ0Foc4Me+/kPnUux/fm/I5i/dRcV75iCgCgMJ9KTQtg6/8AM2BY/Y5DU15+OV3FGzCPcwvD8ZmJEDY6q0iehBhlPhHtrOqWVfX9jTKdz0iw+g8hXiVY63LLaEu29SpVORXJFb6Wt9SPEn5Vtk+4dwv8ZFV6L3YxNr+3/wDU9QwS/wBwvj+Btxy+xfw/EzuIPfY/vE+5pqRSOYXyCjYATA95J+NaKe2xRVNzgW7ifgX8orx6uk2/EkloTrbVfTkVtEhGrZCfIpaM56Zv6o/AfjcpiH3TZgP4jIHCbsPb/Gn5hWCkvto+aNuJV6cvIt+OX4v3B+H8oqfasf8Acy+BlwUU6KZA7SvPymqxYcDuEX7ccywPllJ+YFel2Y2sRG3O5kxkU6MvgVt+BeYDlcIH/wAlRSSryS6v8S/X2deX5G7t7DyHyr6NPRHgPcg49xO9eVjqizKzNVBaFdcavI96RrSKXjd/v2v/AG9r5vW/tFXqR/6ovwMe5L/syJauFiFUFmOyjc1hhRlOWWKuzVNqKzS0RP41dCqlgEE2wS5G3aMZI9n8a24u0FCivu7+ZlwcXOUqr57eRb8BxD9ggXUkHQb/AB2rTSqVbKEDBiIx4jch97TN6pDMPXUHVT7fWqFbAVJK8ZJvmiMKqW6shzgLd9/IfM1o7KjllJM5i9YxsXle2YQoAoDB/SmVjDhiACbgEmJMKYnrp8K8/HZu64mzB2u7mEt4WGBzE5dg/eYaEd1z3hvrJM69ax0610429P0Nk4WPQLFzQeQrz5xTZbbQl27lZpQs7og0d4hgxfTKTEGR0MiCDGseI1BHsOilV+7Ipu4SzIy9zCX8JdW4FzZZgE7ypXQj1t55HwrTS7k1JG3jwxEHCTsZ3imNAeRkQsSQrSqa65cwHcjxq6nTz3bXpy+BRUeTS45w/EEkg2ysbGQyHyYc9diBVuRRWj/JlMpOW6N9gm7ifgX8oryK0e8y5LRE1GqiDcXqRaJNpq20pFMkZz0xbvKP3EP+N6ure6jRgP4jKrh9yLlv/qJ+cVlor7WL8UehXX2cvIs/SC7/AMTc/s/kWre0VfENmbAr7BEIXqwOJrsXPAjkVsU/qqCLf77HTT5T4npXqYGlwISxE+mniebjJcSSox35+BSPd76k7lhPmWn51ipNynd8zfONqTXgbbt2iFk6bDc+XT5V6CqVZPhwPDyxWrEXMO0aFS/O2GGYAbweZFKnZ03HSSb6HY10t1oQLsgwdDznSvPjTcHlkrM2Rd1dGYPHYKrdwtpmVQoLiSVXaDEEb7da9KVe+8E/M0Qwl1eFRq/QdPpC8FbNu3ZzaHs1hj5GoPFVGssEo+R1YKCeao3K3V6CeH8Le7q2icydj/r9mnjyrI8sNZbirird2n6m04JbVVuKJgKondvtdP4V6vZk80JyfU8fEJ5lckJmDCQd9fW19/KtKunr+ZB2a0/IY4Q3/EX/AGVHC/x5/AnWVqUPiXleiZAoAoDz76WUzLhgDBzXOQae6ukHf2a6aVjxUrNP9jVhVe6PPsDKGDmgiAAc1tWAkgT3kPg2uvsrHUtJXW/o3+TNcE07P9j0Czc0HkK81myxKt3ai43INEi3fIquUSGRPc5cvSCCuYHcHY1RaSd0OHEwPFrLG5cytk7ziCA6+tswO+0b8zXqUaiS7yv+Icb7MhYKwVuDuBRrrbYhDodGQ7b6EcxvrFbY1Yyha/rv6lDg09vQ9CwT9xPwr+UV5VRasvWxNR6zSiLEiy9chNxZVJFV6SYB7kOoJGUKYElcrFg2XdgZIMbQK3RanE5QqcKdzLh2tujOO6HU5hqpAYHQ9Y5VyELTTPVzxqwajuXuIx2AuuXZrmYxMAgaADp4VsqzwtSWad7/ABMNOli6cckbW+ALi+HJqLb3DyDEx7QTHvBqtTwcHeMW39dTvCxk9JSSIXEuM3L7CdAPURdh/Mxz+VZ69apXeu3JGmhhYUFfnzYvhnD3uMGOw5/ZB/zt4DQHc1BZaer3Kq+JuskDdcKBFlmX1pbU6+qSAPHQV7eCX+3zR3Z4lX37MaVe8WAIYnU9kdCTvPPf+uZKzut/InurPbzI3pCdbZ594T/drPj1dIuwq1ZRcRwguT9V8QAT1jkfEQa8WNWcXrsb4Ryu6lYjYHhmQ62wfNt/PqPDapTrSekVYnN5/ekXAvN4eyqlTk90VZYrYT+mZZlC4MSAG1iY1Xbc++tlGs6OjV18SE6OfVOz+AvFcVtZRkw9wk7hkYBfMn1tehrZVxVNx7kHcrhh5p96SS80SvRVmNy4WBEqNxHM1d2c5OcnJFeOUVCKizTV655wUAUB579LcZcNIMBrhMDMBCqZI3I8tdqw4t6xRrwvM8+N6ACTIOgYNM6fZfnr9l6wqO9vT9vzRtvzNnj+ILZYLkBlFaS+WMzFZIj1RGrTuQOciyhg41VmbKKmLmhOH4u7XFtrZGrhS3ey5T2YzKdjDM4jn2baiCKveApKLbZV7VUbsKXieLJC27CNrqSjZfXRdGLiV73rc1GaB6tSjhMMleT+vQi8RVuLXH49jNuwMuRiCbThu0hsikMPVMLJ/e3G4nHDYVLV6kXVqmR4li7gxF3UZswLWzpDEAsqnaZnSeuh3OOVGDW2muq/NG2FSWgvBYsOW7rKVJBDCNR06iq3SdJ7ppklNTW1jb4N+4n4V/KKxy3ZeloS0eqnE5YkW7lVSiRaJVnEDnpXItxKZwIXEcFbuyYCsdzEhvxLsfn41N4lrkdhGUNmZbiHA2QyunhMofJt1PgfgKvjUjPY20sU1pNfEi4fCXGMEFdY2k+wD1vl411xtq9jRPEU4rTU0XD+DKom5/dnU/jYb+QgVnniEtIep59Sc6u5b5wNBAA2A0AqizluyKjYmYC6xt9mq5u85YZspgtmBBkdYnqK+gwdS9BU46vmr2MNWNqjb0HbiOd7Sg6RNwsCOY200q+UZPVx+bOK3J/Ip+LYiSimAVmQGzATECSBrpWGvUzWTNtCna7WwxwN8W7/AF1vKgSR3Ilu5vIBBEuI6KDrNbqlKgoJw1ZhjObepY3Wc3V+zbWDIMFnkaMNjbyk7n1gegI7CMVHVakZNtnLeNxbSRh0y9+PrwZj1dQNA3kYrvDpc5fI5mk+Qzcu40j9nZUxsXZhPmANP5+GsGqK5sks/QhYkY0kw1hRJ5Oxy6RppLetPI6baxHNQ55vkTSn4Fx6KBwWzlS0alRA9YxAO2lWYVxc3lWhXWvZXNJW8oCgCgMx6b8Eu4hEa0Rmt5jlOmbNGx5HT/tWPGYaVaKy7o04WtGk3fmeVYzBFWYa23GjqRofB1PzFeTxJR7lRbeqPTyRfei/0NfjcS6uoViBkBIgET3okyCCY01jQ1toRTjqefUbTGbOKvkCXbkIgL5z9edI0Ec/Da7JTXJfXwIXY6DiSD+0+yRqrE/eGhbrOv3R1rtqaf8Ac53h2xhrxjMH8Zg8tNrHXTSIyzrJFSzw5W+victIx/FkBu3EuASGI73qk6eq4UFDJiI5eqJrEpOLco+O36c0bkk4pP6+Izh0ZXADHKRGR4zaDTIRow5mDpO3TjkpK9teq/NciSTi7fibbCP3E/Cv5RWBvvM2KOiJSPQg0PI9RcSGg6GNQdNvkcukdysetVvDyZ3PFCGwLNzeiw1Tkgq0V0EDhEd7vAAaktAAHMmdBVvs1eejOPEwiuRJtcOaAVEg6g5gQR1BnWnsNW+qI+0wfMWcFc6D31YsHNEfaIEa9g7/ACZB4yZHkQNK6sPWi7xaRJV6L95NhiWxjIEa7bHVgGzMOhPz61plLESjlcl5lcfZoyzKLfgRFwj83B9lUQoTT1kXPFQtpE4vDrpnuyTGhJXXKQ3/AClgSZ35coAr2VOCPJcXcfXhF89fPtG8Bst1RsPDXWrVXgtvr5EHCRaWcHdFoJmKsCZMnUZCBJzMd4OrHb2VROpFzbJqLsRruEu6ZnmGzHvHw7oAEQI08ztXM8ehLKyCuBdcs3ZgkkakGRA5+sORI5Dqai5p/dJJeJdeilplLBmZ9PWIj7RMewGrcOnmbtbQrq7bmkraUhQBQBQFNx/0csYpe8IeO649YfzHgaorYeFVd71LaVaVN6ehFT0ecRLj3VR7Ev5ibrvoPrwI87nwqSwUOpF12OrwQc3PwqawlPxOcWQ6vCEH2mrqw1NciLqSZ416RFUxWInuA3nhz3keCB3xyOgAPhXnZW5NR1tfTmvI9NPuq+n4EO5cKwpgA/ZPetuMumRvs7c/HwqMYqV3Hf5rzXMk3bR/t8DaYrGNatYcrl7xRSGGpBtzCwRDTrOux05izDUY1G8xmq1JR2ZDsccu5VclTNxkIVJChbzqWJQsQAiD1ogtJAEVtWDpN5bfPwM/GlvcfwWPxL2S7tBm0VCqofW6yNbIIK5+5BA0ksAR3WHHRoqail15nVObV2N2r/EXIZHIUs26AaDOykDJMZVjxLW4ggkzccNGNmtdCF6jHbzY24SbZvLbDHMDbuo5B7TLkkKwAXKTk1kqJDSB1cCK1tfzQ77Lb0fw2J7Rmv8AaHR1SXYrlLW2SUzEZwMy5iJ0OutVYiVNxSgdpqV7ss+K2bjhUAGQspvSAwe3mAa2BI1I16QsEMDBrotRbb+B2proJunEqETDiyqye65GZVzOQEVTGi5YGwE9IqxcN3c73Ia7I46Y/SGw/rHMSGJKjLAAAjXvT7IPTl6HiS+0GHw2MgzfQbRCA9J3A/o8qg50VtElln1IuIwOJM/8UR3gRFserr3YnnprvpXOLSWuT5kssuojC4R0aWvvc7sQ205pzADQaabczrVU6kZbRSJKLXM2S8MTq3vr0I0KdtjNxJdRwYBOrf3j/OpqlBbI5mYr9Bt/dnz1ruWPQ5dihhLf3B7qkcFiyo2Ue6gFgUB2gCgCgCgCgCgCgCgOGgPIfSjht21fuNcXuXLjsrbqczEweh12PsrwMTSnTqOR69CpCcFEztzCusm0ZUxNttV0+6dwf68KKvGX8TR9V+ZJ02vd9DZX8SyW7JUqPqwZaBsqDRm0XRjqf9jfh4Ke9/gZKraeg1+tLgaAVEbjtrUhoGZSFtmCDIP4ZrTwI21v6P8AMrzsU/FnHrXUGoBOZzylxCJuNANdd/CioRfJ+i/U5nZw8TuFQ2dRqCSP0iMpmD6wjVHB06HbWrFRjeyX4HHNj1q7eMEm60EBsti4dQQdnacrAkTyKnyruWK5L1X6Ebsee2wkMXgEjvWEXMANIZmnkRIgkuOQoreBx3EWgSdSRqF9fDIYLesQJGk6nmOka23X1chqWHBbVwXFLBz1m8t5QcpGyLC+ZPhzqNVrI7HYrUsMccRLZJI72XQfcEdNiSQSdwegqiOS2pN5rkW+l+V0cgBgSGgSrMVYgvLAwo1kwetcvDXYlqQuwxMesw1EywJYDlrmyyN4I1rkp0rhKVjttLweWYdnkHd3YNpuefPWaolKnay3uWpM36mvWWxiO10BQBQBQBQBQBQBQBQBQBQBQBQBQEfGYRLilXUMCIIIkGuOKaszqbTujz30i9DXty+Hl13KbsPwn7Q8Dr515OI7Pa71L0/Q9GjjE9J+ouzhw1u1mnS2oiAd1WQQwP3RVdNyitERnlu7sft4Bfunnyg66nVQKt+1fL8SrudSVbwZ5C5/ef8A1VLh1ny/AZodR9cATvbY+cn5mpKjW6fgRzwHU4X/AOgv9xaksPW6/M5xIkqzgGXa0B5AD5VP2ao92c4q6EtbV37v+L/aurC+JHiroL7C6eSj2k1P2VdTnE8A/Q7h5r7j/Ou+zR6jisSeGE7t8KezQHEkH6nXmxrvs9Poc4khS8GtcwT5mpcCn/Kczy6liqxpVhE7XQFAFAFAFAFAFAFAFAFAFAFAFAFAFAcImgG/0degoBQtDpQHcgoDsUARQHaAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKA//2Q==",
    "id": 16,
    "title": "Vitamin D3 Drops (Infant)",
    "price": 150,
    "mfg": "15/09/2025",
    "exp": "15/09/2026",
    "company": "Enfamil",
    "details": "Essential for infant bone development.",
    "category": "Drops"
  },
 
  
  
  
  
]



  const [products,setProducts]=useState(()=>{
    const saved = localStorage.getItem("products");
  const savedProducts = saved ? JSON.parse(saved):[];
  return [...productslist,...savedProducts];
  });





   
 




  const handleLoginSuccess = (userData) => {
    console.log('Login successful!');
    // Navigate to dashboard after successful login
    navigate('/');
    //navigate('/dashboard');
  };

  const handleRegisterSuccess = (userData) => {
    console.log('Registration successful!');
    // Navigate to login after successful registration
    navigate('/login');
  };


 





useEffect(() => {
    const extraProducts = products.filter(
      (p) => !productslist.some((dp) => dp.id === p.id)
    );
    localStorage.setItem("products", JSON.stringify(extraProducts));
  }, [products]);
 
 
  // const [favourites, setFavourites] = useState(() => {
  //   try {
  //     const saved = localStorage.getItem("favourites");
  //     return saved ? JSON.parse(saved) : [];
  //   } catch {
  //     return [];
  //   }
  // });
  
 
      useEffect(() => {
  const activeFavourites = productUsers;
  setFavourites(activeFavourites);
}, [productUsers]);







  const fetchProductUsers = async () => {
    try {
      const userDetails = localStorage.getItem("User");
      console.log('user', userDetails);

      const userEmail = userDetails ? JSON.parse(userDetails).email : null;
     // if(userEmail){
     if(userDetails){
      console.log("hello");
      const res = await axios.get("http://localhost:3001/p/getproductUsers", {
        params: { 
          user: userEmail,
          },
        headers: { "Cache-Control": "no-cache" },
      });
  
      //if (mountedRef.current) {
        setProductUsers(Array.isArray(res.data) ? res.data : res.data || []);
        console.log('productUsers fetched :: ', res.data);
    }
    //}
        //setFavourites(Array.isArray(res.data));

      //}
    } catch (err) {
      console.error("Error fetching products:", err.stack);
    }
  };
  

    const togglefavourite = async (product) => {
    try {
      
        console.log('fetch pusers :: ', productUsers);

        const isAlreadyFav = favourites.some(fav => fav.productId === product.id);
        const updatedFavourites = isAlreadyFav
          ? favourites.filter(fav => fav.productId !== product.id)
          : [...favourites, product];
        //updatedFavourites = (updatedFavourites) ? updatedFavourites : [];
        setFavourites(updatedFavourites);

       const isfav = !favourites.some((fav) => fav.productId === product.id);
        // if (favourites.some((fav) => fav.id === product.id)) {
        //   setFavourites(favourites.filter((fav) => fav.id !== product.id));
        // } else {
        //   setFavourites([...favourites, product]);
        // }
        const userDetails = localStorage.getItem("user");
        const userInfo = userDetails ? JSON.parse(userDetails).email : null;
        console.log(userInfo,' ',product.id);

       

       let matchedRecord =  productUsers.find(record => record.productId.toString() == product.id.toString());
        console.log("Matched Record", matchedRecord);

      if(!matchedRecord){
        console.log('new Record');

        let setNewProductUser = {
        user: userInfo, // Replace with actual user email
        productId: product.id,
        Active: "true", // or false depending on your logic

      };
        const res = await api.post("/p/addProductUser", setNewProductUser);
        console.log('Response', res.data);
      } 
      else{
        //let matchedStatus = matchedRecord.Active; 
        console.log('existing record',matchedRecord.Active);
        let status = matchedRecord.Active == "false" ? "true" : "false";
        console.log('Status to be updated to :', isfav);


        let setNewProductUser = {
        user: userInfo, // Replace with actual user email
        productId: product.id,
        };
        const res = await api.delete("/p/deleteProductUser", {
  data: {
    user: userInfo,
    productId: product.id
  }}
);

        console.log('Response', res.data);
      }
      
      fetchProductUsers();
    } catch (err) {
      console.error("Add product User error:", err);
    }
  };


   const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("favourites");
   // setFavourites([]);
    setUser(null);
    setIsLoggedIn(false);
    setFavourites([]);
    clearCart();
  };

  return(
    <>
     <Toaster position="top-right" reverseOrder={false} />
    <themeContext.Provider value={{products,setProducts}}>
     <CartProvider>
      
    <ScrollToTop/>
    
    <Navbar/>
       
     <Routes>
       
        {/*<Route path="/" element={<Medibox />} />*/}
        <Route path="/" element={<Medibox/>}/>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs/>}/>
      <Route path = "/login" element={<Login/>}/>
   
      <Route path = "/products" element={ <ProductList togglefavourite={togglefavourite}
    favourite={favourites} />}/>
         <Route path = "/products/:id" element={ <ProductView/>}/>
     
      <Route path = "/cart" element={<CartPage/>}/>
      <Route path ="/adminaddproduct" element={<AdminAddProduct/>}/>
    {/* <Route path ="/wishlist" element={<WishList favourites={favourites} togglefavourite={togglefavourite}/>}/> */}
      <Route path ="/checkoutpage" element={<Checkout/>}/>
     <Route path="/paymentpage" element={<Payment />} />
     <Route path ="/register" element={<RegisterForm/>}/>
     <Route path ="/profile" element={<Profile/>} />
       {/* <Route path="/wishlist" element={<WishList favourites={favourites} togglefavourite={togglefavourite} />} /> */}
    <Route path="/order" element={<OrderSuccess/>}/>


        
  


      

     <Route path='/login' element={
        <Login
          onLoginSuccess={handleLoginSuccess} onLogout={handleLogout}
          
        />
      } />



      <Route path='/register' element={
        <RegisterForm
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => navigate('/login')}
        />
      } />
     

<Route path="/checkoutpage" element={<Checkout/>}/>
<Route path ="/ordersuccess" element={<OrderSuccess/>}/>



       <Route path="/admin/login" element={<LoginAdmin />} />

        
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/shipping"element={<Shipping/>}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/reset"   element={<ResetPassword/>}/>
        <Route path="/toggleWishlist" element={<WishList favourites={favourites || []} togglefavourite={togglefavourite}/>}/>
        

     </Routes>
      <ToastContainer/>
     </CartProvider>
     </themeContext.Provider>
    </>
  )
 
}
	
