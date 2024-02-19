import React from 'react'
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({cardData}) => {
    const {image,name,id} = cardData;
    const navigate = useNavigate();
  return (
    <div onClick={()=> navigate(`/category/${id}`)} className=' hover:scale-110 transition-all duration-300 bg-white xs:mx-auto w-full md:w-[300px] rounded-sm  cursor-pointer shadow-lg'>
        <img src={image} alt='img' className=' w-full  rounded-sm  h-[250px] object-cover' />
        <p className=' font-semibold p-3 text-2xl'>{name}</p>
    </div>
  )
}

export default CategoryCard