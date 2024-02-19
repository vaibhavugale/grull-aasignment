import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import CategoryCard from '../../common/CategoryCard/CategoryCard';
import { DNA } from 'react-loader-spinner';

const Home = () => {
    const [allCatagories , setAllCatagories] = useState([]);
    useEffect (()=>{
       const getAllCatagories = async () =>{
           const response = await fetch("https://api.escuelajs.co/api/v1/categories");
           const data = await response.json();
           setAllCatagories(data);
       }
       getAllCatagories();
    },[])
  return (
    <div className=' md:w-[1080px] h-[100vh] mx-auto p-5 overflow-scroll'>
    {/* search bar */}
    <div  className=' md:w-[60%] flex px-2 justify-between md:p-3  mx-auto  rounded-sm bg-white shadow-lg md:rounded-md'>
          <div className=' flex justify-between items-center w-full gap-2 '>
          <CiSearch size={30} className=' md:block hidden' />
            <input  className=' outline-none text-slate-500 w-full font-mono text-sm p-2   md:text-lg '  placeholder='Search Equipment'/>
          </div>
          <div className=' flex justify-center items-center gap-2'>
            <button className=' font-semibold md:text-xl tracking-wide text-black md:text-slate-100 transition-all duration-500 md:px-3 md:py-1 md:rounded-md md:bg-slate-400 md:hover:bg-slate-950 ' ><span className="md:block hidden">search</span>   <CiSearch size={20} className=' md:hidden   block' /></button>
           <abbr title='filter'>
           {/* <button><CiFilter size={30} /></button> */}
           </abbr>
          </div>
         
       </div>
{
  allCatagories.length===0 ?
    (<div className=" h-[100vh] flex justify-center items-center">
      <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          />
    </div>)

    :(<div className=' flex w-full flex-wrap justify-between  mt-6 gap-4'>
      {
        allCatagories.map((cardData)=><CategoryCard key={cardData?.id}  cardData={cardData}/>)
      }
    </div>)
}
    
    
    </div>
  )
}

export default Home