import { createContext, useState } from "react";
import toast from "react-hot-toast";

const DataContext = createContext();

const ContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  const setCartItem = (data) => {
    const result = cartData.filter((i) => i?.id != data?.id);

    setCartData(result.concat([data]));
  };

  const removeItem =  (id) =>{
    const result = cartData.filter((cd)=>cd?.id != id);
    setCartData(result);
  }

  return (
    <DataContext.Provider
      value={{
        setCartItem,
        cartData,
        removeItem
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, ContextProvider };
