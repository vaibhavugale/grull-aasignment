import React from 'react'

const CartCard = ({cardData,removeItem}) => {
  const {images,price,id} = cardData;
  return (
    <div className=' border p-2 max-w-[30%] max-h-[40%] '>
     <img src={images[1]} className=' w-full h-[200px] object-cover' />
     <div className=' flex w-full justify-between mt-3'>
     <p className=' font-bold'>₹ {price}</p>
     <button  onClick={()=>removeItem(id)}  className=' bg-red-600 text-white font-bold px-2 py-1 rounded-md hover:bg-red-700 transition-all duration-200'>Remove</button>
     </div>
    </div>
  )
}

export default CartCard