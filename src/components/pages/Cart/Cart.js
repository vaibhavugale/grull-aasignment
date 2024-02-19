import React, { useContext } from 'react'
import { DataContext } from '../../../Context'
import CartCard from '../../common/CartCard/CartCard';

const Cart = () => {
  const {cartData,removeItem} = useContext(DataContext);
  // console.log(cartData);
  return (
    <div className=' border w-[70%] h-[95vh] overflow-scroll flex  flex-wrap   gap-3 p-3 ml-8 mt-7'>
      {
        cartData.map((cartData)=><CartCard key={cartData?.id} cardData={cartData} removeItem={removeItem} />)
      }
    </div>
  )
}

export default Cart