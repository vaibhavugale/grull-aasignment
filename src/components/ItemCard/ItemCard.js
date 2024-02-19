import React from 'react';
import {motion} from "framer-motion"

const ItemCard = ({itemData,setCardData}) => {
    const {price,title,description,images,id} = itemData;
  return (
    <motion.div onClick={()=>setCardData(itemData)} className={  " shadow-lg p-3 cursor-pointer rounded-md w-[300px]"} >
    <motion.img
      src={images[1]}
      className={"w-full object-cover h-[200px]"}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    />
    <motion.h5>{title}</motion.h5>
    <motion.h2>{price}</motion.h2>
  </motion.div>
  )
}

export default ItemCard