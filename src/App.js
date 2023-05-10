import "./App.css";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
// import Pagination from "./components/Pagination";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favorite from "./components/Favorites";
import PageNotFound from "./components/PageNotFound";

function App() {
   return (
      <div className="">
         <BrowserRouter>
            {/* <h1>Hello React 🧡</h1> */}
            <NavBar></NavBar>
            <Routes>
               <Route
                  path="/"
                  element={
                     <>
                        <Banner></Banner>
                        <Movies></Movies>
                     </>
                  }
               ></Route>

               <Route
                  path="/fav"
                  element={
                     <>
                        <Favorite></Favorite>
                     </>
                  }
               ></Route>

               <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
