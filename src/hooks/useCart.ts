 import {useState,useEffect,useMemo} from 'react'
 import { db } from '../data/data'
 import type {IGuitar,CartItem ,GuitarId} from '../types'


const useCart=()=>{

  const initialCart=():CartItem[]=>{
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart):[]
  }

const [data]=useState(db);
const [cart,setCart]=useState(initialCart);

const MAX_ITEMS=5
const MIN_ITEMS=1

useEffect(()=>{

  localStorage.setItem('cart',JSON.stringify(cart));
},[cart])

function addToCart(item:IGuitar){

  const itemExists=cart.findIndex(guitar=>guitar.id===item.id);
  if(itemExists >= 0){
    if(cart[itemExists].quantity>=MAX_ITEMS) return
    const updateCart=[...cart]
    updateCart[itemExists].quantity++
    setCart(updateCart)
  }else{
    const newItem:CartItem={...item,quantity:1}
    setCart([...cart,newItem])
  }
}

function removerFromCart(id:GuitarId){
  setCart(prevCart=>prevCart.filter(guitar =>guitar.id !==id))

}

function increaseQuantity(id:GuitarId){
  const updatedCart=cart.map(item=> {
    if(item.id===id && item.quantity < MAX_ITEMS){
      return{
        ...item,
        quantity:item.quantity +1
      }
    }
    return item
  })
setCart(updatedCart);
}

function DecreaseQuantity(id:GuitarId){
  const updatedCart=cart.map(item=> {
    if(item.id===id && item.quantity > MIN_ITEMS){
      return{
        ...item,
        quantity:item.quantity - 1
      }
    }
    return item
  })
setCart(updatedCart);
  
}

function clearCart(){
  setCart([]);
}

const isEmpty = useMemo(() =>cart.length === 0,[cart])

const cartTotal=useMemo(()=>cart.reduce((total,item)=>total+(item.quantity* item.price),0),[cart])

    return {
        cart,
        data,
        addToCart,
        removerFromCart,
        increaseQuantity,
        DecreaseQuantity,
        clearCart,
        isEmpty ,
        cartTotal
    }

}

export default useCart;