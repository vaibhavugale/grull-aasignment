import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/common/Footer/Footer";
import Header from "./components/common/Header/Header";
import Sidebar from "./components/common/Sidebar/Sidebar";
import { AnimatePresence } from "framer-motion";


function App() {
  const location = useLocation();
  return (
    <div className=" relative">
      <Header />
      <div className=" flex">
        <Sidebar />
        <AnimatePresence  location={location} key={location?.pathname} >
             <Outlet />
        </AnimatePresence>
      </div>

      <Footer />
      
    </div>
  );
}

export default App;
