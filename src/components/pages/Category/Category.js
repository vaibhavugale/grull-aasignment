import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItemCard from "../../ItemCard/ItemCard";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../Context";
import { DNA } from "react-loader-spinner";
import toast from "react-hot-toast";
import RangeSlider from 'react-range-slider-input';

const Category = () => {
  const [itemList, setItemLIst] = useState([]);
  const [filterValue , setFilterValue] = useState();
  const [filterData,setFilterData] = useState([]);
  const {catName} = useParams();
  const [cardData, setCardData] = useState();
  const [readMore , setReadMore] = useState(true);
  const {setCartItem} = useContext(DataContext) ;

  const handelAddToCartBtn = () => {
       setCartItem(cardData);
       toast.success('Successfully created!');
       setCardData(null);
  }
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${catName}`
      );
      const data = await res.json();
      setItemLIst(data);
      setFilterData(data);
    };
    getProduct();
  }, []);

  const debounce= (func,delay) =>{
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const filter = (e) =>{
    if(e.target.value == 10){
      setFilterData(itemList);
      setFilterValue(+e.target.value);

      return;
    }
     const filterResult = itemList.filter((item)=> +item?.price <= +e.target.value)
     setFilterData(filterResult);
      setFilterValue(+e.target.value);
   
  }
  return (
    <div className=" relative">
     <div className="  relative flex mt-6 ml-5">
        <p>0</p> <input  onChange={debounce(filter,100)} type="range" min={10} max={1000}   /> <p>10000</p>
        <p className="  absolute bg-white top-[25px] shadow-xl rounded-md  ">{filterValue}</p>
     </div>
      <motion.div
        initial={{ x: "-5%", opacity: 0 }}
        animate={{ x: 0, opacity: "100%" }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex overflow-scroll justify-center items-center mt-8 mb-4 gap-5 flex-wrap max-h-[90vh] max-w-[1080px] mx-auto"
      >
        { filterData.length===0 ?
        ( <div className=" w-[100vw] h-[100vh] flex justify-center items-center" >
                <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          />
          
     </div>):
     filterData.map((item) => (
          <ItemCard key={item?.id} itemData={item} setCardData={setCardData} />
        ))   }
      </motion.div>




      <AnimatePresence>
        {cardData && (
          <motion.div
            initial={{ x: "-5%", opacity: 0 }}
            animate={{ x: 0, opacity: "100%" }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={
              " bg-white   absolute  top-[10%] left-[30%] w-[500px] rounded-md shadow-2xl  "
            }
          >
            <img
              className=" rounded-t-md h-[300px]  object-cover w-full"
              src={cardData?.images[1]}
            />
            <div className=" p-2 flex flex-col justify-between">
              <p className=" font-bold text-xl">{cardData?.title}</p>
              <p className="text-2xl mt-2"> <span className=" text-3xl font-bold ">₹</span>  {cardData?.price}</p>
              <p className=" font-normal mt-3">{ readMore? ( <>`${ cardData?.description.substring(0, 150) }` <span className=" text-blue-500 cursor-pointer " onClick={()=>setReadMore(false)}> Read more...</span></>): (cardData?.description)}</p>
         
              <div className=" mt-3 w-full flex justify-between items-center ">
                <button onClick={() => {
                  setCardData(null)
                  setReadMore(true)
                }} className=" bg-red-600 text-white font-bold px-3 py-1 rounded-md hover:bg-red-700 transition-all duration-200">close</button>
                <button onClick={handelAddToCartBtn} className=" bg-orange-600 font-bold text-white px-2 py-1 rounded-md hover:bg-orange-700 transition-all duration-150">Add to Cart</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Category;
