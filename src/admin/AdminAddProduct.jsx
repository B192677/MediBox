// import '../App.css';
import  React,{ createContext, useContext, useRef,useState} from 'react'
import { themeContext } from '../App';

export default function AdminAddProduct(){
 const {products, setProducts}= useContext(themeContext)
   const imageRef= useRef();
    const idRef=useRef();
    const titleRef=useRef();
    const compositionRef=useRef();
    const consumeRef=useRef();
    const returnRef=useRef();
    const expiresRef=useRef();
    const nppaRef=useRef();
    const categoryRef=useRef();
    const addproduct =(e)=>{
        e.preventDefault();
        const product={
            image:imageRef.current.value,
            id:idRef.current.value,
            title : titleRef.current.value,
            composition :compositionRef.current.value,
            consume:consumeRef.current.value,
            returns : returnRef.current.value,
            expires:expiresRef.current.value,
            nppa:nppaRef.current.value,
            category:categoryRef.current.value

        }
        console.log(product)
        setProducts((prevState)=>[...prevState,product]);

        Reset();
    }
    const Reset=()=>{
        imageRef.current.value="",
        idRef.current.value="",
          titleRef.current.value="",
           compositionRef.current.value ="",
            consumeRef.current.value="",
           returnRef.current.value="",
        expiresRef.current.value="",
           nppaRef.current.value="",
           categoryRef.current.value=""


    }


    return(
        <>
       
        <div className = "mx-auto bg-green-600 w-90">
             <form onSubmit={addproduct}>
                <div className="p-1  border-1 black">


                    <div className="p-1 flex justify-around border-1 black">
                    <label>Image
                    </label>
                    <input type="text" placeholder="enter id"  ref ={imageRef}></input>
                    </div>
                    <div className="p-1 flex justify-around border-1 black">
                    <label>id
                    </label>
                    <input type="text" placeholder="enter id"  ref ={idRef}></input>
                    </div>
                    <div className="p-1 flex justify-around border-1 black">
                    <label>Title
                    </label>
                    <input type="text" placeholder="enter title"  ref ={titleRef}></input>
                    </div>
                    <div className="p-1 flex justify-around border-1 black">
                    <label>Composition</label>
                    <input type="text" placeholder="enter composition" ref ={compositionRef}></input>
                    </div>
                    <div className="p-1 flex justify-around border-1 black">
                     <label>Consume Type
                    </label>
                    <input type="text" placeholder="enter consume type" ref ={consumeRef}></input>
                    </div >
                    <div className="p-1 flex justify-around border-1 black">
                     <label>Return Policy
                    </label>
                    <input type="text" placeholder="enter return Policy"  ref ={returnRef}></input>
                    </div>
                    <div className="p-1 flex justify-around border-1 black">
                     <label>Expires On or after
                    </label>
                    <input type="text" placeholder="enter expires date"  ref ={expiresRef}></input>
                    </div>
                    <div className="p-1 flex justify-around border-1 black">
                     <label>NPPA
                    </label>
                    <input type="text" placeholder="enter NPPA"  ref ={nppaRef}></input>
                    </div>
                     <div className="p-1 flex justify-around border-1 black">
                     <label>Category
                    </label>
                    <input type="text" placeholder="enter Category"  ref ={categoryRef}></input>
                    </div>
                    <button type="submit" className="bg-black-100 border-1 hover:bg-teal-500">AddProduct</button>
                </div>
             </form>
        </div>
       
    
        </>
    )

}
	
