import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItemCard from "../../ItemCard/ItemCard";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../Context";
import { DNA } from "react-loader-spinner";
import toast from "react-hot-toast";

const Category = () => {
  const [itemList, setItemLIst] = useState([]);
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
    };
    getProduct();
  }, []);
  return (
    <div className=" relative">
      <motion.div
        initial={{ x: "-5%", opacity: 0 }}
        animate={{ x: 0, opacity: "100%" }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex overflow-scroll justify-center items-center mt-8 mb-4 gap-5 flex-wrap max-h-[90vh] max-w-[1080px] mx-auto"
      >
        { itemList.length===0 ?
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
      itemList.map((item) => (
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
