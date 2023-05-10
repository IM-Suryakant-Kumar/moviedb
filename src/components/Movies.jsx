import React, { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";

function Movies() {
   let [movies, setMovies] = useState([]);
   let [pageNum, setPage] = useState(1);
   let [hovered, setHovered] = useState("");
   let [favorites, setFavorites] = useState([]);
   // Making API Request
   useEffect(() => {
      console.log("useEffect Again");
      (() => {
         axios
            .get(
               "https://api.themoviedb.org/3/trending/all/week?api_key=6cd46db7aa2ee39be65321fb0d418065&page=" +
                  pageNum
            )
            .then((res) => {
               // console.table(res.data.results);
               setMovies(res.data.results);
            });
      })();
   }, [pageNum]);
   // Pagination handler
   const onPrev = () => {
      if (pageNum > 1) {
         setPage(pageNum - 1);
      }
   };
   const onNext = () => {
      setPage(pageNum + 1);
   };
   // Emoji show and hide
   const showEmoji = (id) => {
      setHovered(id);
   };
   const hideEmoji = (id) => {
      setHovered("");
   };
   // Favorite add and remove
   const addEmoji = (id) => {
      const newFav = [...favorites, id];
      setFavorites(newFav);
   };
   const removeEmoji = (id) => {
      // whenever elem -> not equal to id
      const filteredFav = favorites.filter((elem) => {
         return elem !== id;
      });
      setFavorites(filteredFav);
   };

   return (
      <div className="mt-8">
         <div className=" mb-8 font-bold text-2xl text-center text-gray-900 ">
            Trending Movies
         </div>

         <div className=" flex flex-wrap justify-center ">
            {movies.length === 0 ? (
               <div className="flex justify-center cursor-default">
                  <Oval
                     height="80"
                     width="80"
                     radius="9"
                     color="gray"
                     secondaryColor="gray"
                     ariaLabel="loading"
                     wrapperStyle
                     wrapperClass
                  />
               </div>
            ) : (
               movies.map((movie) => {
                  return (
                     <div
                        key={movie.id}
                        onMouseOver={() => {
                           showEmoji(movie.id);
                        }}
                        onMouseLeave={() => {
                           hideEmoji(movie.id);
                        }}
                     >
                        <div
                           className=" bg-center bg-cover w-[160px] h-[30vh] md:h-[40vh] md:w-[180px] m-4 rounded-xl hover:scale-110 duration-300 flex items-end relative"
                           style={{
                              backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                           }}
                        >
                           <div
                              className=" p-2 bg-gray-900 rounded-xl cursor-pointer absolute top-2 right-2 "
                              style={{
                                 display:
                                    hovered === movie.id ? "block" : "none",
                              }}
                           >
                              {favorites.includes(movie.id) === false ? (
                                 <div
                                    className="text-2xl"
                                    onClick={() => {
                                       addEmoji(movie.id);
                                    }}
                                 >
                                    ⭐
                                 </div>
                              ) : (
                                 <div
                                    className="text-2xl"
                                    onClick={() => {
                                       removeEmoji(movie.id);
                                    }}
                                 >
                                    ❌
                                 </div>
                              )}
                           </div>
                           <div className=" font-bold text-white bg-gray-900 bg-opacity-60 p-2 rounded-b-xl text-center w-full">
                              {movie.title || movie.name}
                           </div>
                        </div>
                     </div>
                  );
               })
            )}
         </div>
         <Pagination
            pageNum={pageNum}
            onPrev={onPrev}
            onNext={onNext}
         ></Pagination>
      </div>
   );
}

export default Movies;
