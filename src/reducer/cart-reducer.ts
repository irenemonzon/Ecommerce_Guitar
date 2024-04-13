import { db } from "../data/data"
import type { IGuitar,GuitarId, CartItem } from "../types"

export type cartActions = 
{type:'add-to-cart',payload:{item:IGuitar}} |
{type:'remove-from-cart',payload:{item:GuitarId}} |
{type:'decrease-quantity',payload:{item:GuitarId}} |
{type:'increase-quantity',payload:{item:GuitarId}} |
{type:'clear-cart'}

 export type cartState={
    data:IGuitar[]
    cart:CartItem[]
 }
 
 const initialCart=():CartItem[]=>{
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart):[]
  }
  export const initialState:cartState={
    data:db,
    cart:initialCart()
 }
 const MAX_ITEMS=5
 const MIN_ITEMS=1


 export const cartReducer=(
    state:cartState = initialState,
    action:cartActions
 )=>{
    if(action.type==='add-to-cart'){
        const itemExists=state.cart.find(guitar=>guitar.id===action.payload.item.id);

        let updateCart:CartItem[]=[]

        if(itemExists){
            updateCart=state.cart.map(item=>{
                if(item.id===action.payload.item.id){
                    if(item.quantity<MAX_ITEMS){
                        return{...item,quantity:item.quantity +1}
                    }else{
                        return item
                    }
                }else{
                    return item
                }
            })

        }else{
            const newItem:CartItem={...action.payload.item,quantity:1}
            updateCart=[...state.cart,newItem]
        }
        
        return{
            ...state,
            cart:updateCart
        }
    }
    if(action.type==='remove-from-cart'){
    
        const updateCart= state.cart.filter(item =>item.id !== action.payload.item)

        return{
            ...state,
            cart:updateCart
        }
        
    }
    if(action.type==='decrease-quantity'){

        const updatedCart=state.cart.map(item=> {

            if(item.id===action.payload.item && item.quantity > MIN_ITEMS){
              return{
                ...item,
                quantity:item.quantity - 1
              }
            }
            return item
          })

        return{
            ...state,
            cart:updatedCart
        }
    }
    if(action.type==='increase-quantity'){
        const updatedCart=state.cart.map(item=> {
            if(item.id===action.payload.item && item.quantity < MAX_ITEMS){

              return{
                ...item,
                quantity:item.quantity +1
              }
            }
            return item
          })

        return{
            ...state,
            cart:updatedCart
        }
    }
    if(action.type==='clear-cart'){
        return{
            ...state,
            cart:[]
        }
    }

    return state
 }

