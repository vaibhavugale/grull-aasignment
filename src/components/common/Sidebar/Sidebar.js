import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className=' h-[100dvh] flex justify-center   border-r  border-slate-600 w-[150px]'>
     <ul className='translate-y-7'>
        <li className=' cursor-pointer'  onClick={()=>navigate("/")}>Home</li>
        <li  className=' cursor-pointer' onClick={()=>navigate("/cart")}>Cart</li>

     </ul>
     
    </div>
  )
}

export default Sidebar