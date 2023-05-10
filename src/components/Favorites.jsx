import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
let genreids = {
   28: "Action",
   12: "Adventure",
   16: "Animation",
   35: "Comedy",
   80: "Crime",
   99: "Documentary",
   18: "Drama",
   10751: "Family",
   14: "Fantasy",
   36: "History",
   27: "Horror",
   10402: "Music",
   9648: "Mystery",
   10749: "Romance",
   878: "Sci-Fi",
   10770: "TV",
   53: "Thriller",
   10752: "War",
   37: "Western",
};
let sampleMovies = [
   {
      adult: false,
      backdrop_path: "/ogFIG0fNXEYRQKrpnoRJcXQNX9n.jpg",
      id: 619930,
      title: "Narvik",
      original_language: "no",
      original_title: "Kampen om Narvik",
      overview:
         "April, 1940. The eyes of the world are on Narvik, a small town in northern Norway, a source of the iron ore needed for Hitler's war machine. Through two months of fierce winter warfare, the German leader is dealt with his first defeat.",
      poster_path: "/gU4mmINWUF294Wzi8mqRvi6peMe.jpg",
      media_type: "movie",
      genre_ids: [10752, 18, 36, 28],
      popularity: 321.063,
      release_date: "2022-12-25",
      video: true,
      vote_average: 7.406,
      vote_count: 53,
   },
   {
      adult: false,
      backdrop_path: "/6RCf9jzKxyjblYV4CseayK6bcJo.jpg",
      id: 804095,
      title: "The Fabelmans",
      original_language: "en",
      original_title: "The Fabelmans",
      overview:
         "Growing up in post-World War II era Arizona, young Sammy Fabelman aspires to become a filmmaker as he reaches adolescence, but soon discovers a shattering family secret and explores how the power of films can help him see the truth.",
      poster_path: "/d2IywyOPS78vEnJvwVqkVRTiNC1.jpg",
      media_type: "movie",
      genre_ids: [18],
      popularity: 163.3,
      release_date: "2022-11-11",
      video: false,
      vote_average: 8.02,
      vote_count: 561,
   },
   {
      adult: false,
      backdrop_path: "/fTLMsF3IVLMcpNqIqJRweGvVwtX.jpg",
      id: 1035806,
      title: "Detective Knight: Independence",
      original_language: "en",
      original_title: "Detective Knight: Independence",
      overview:
         "Detective James Knight 's last-minute assignment to the Independence Day shift turns into a race to stop an unbalanced ambulance EMT from imperiling the city's festivities. The misguided vigilante, playing cop with a stolen gun and uniform, has a bank vault full of reasons to put on his own fireworks show... one that will strike dangerously close to Knight's home.",
      poster_path: "/jrPKVQGjc3YZXm07OYMriIB47HM.jpg",
      media_type: "movie",
      genre_ids: [28, 53, 80],
      popularity: 119.407,
      release_date: "2023-01-20",
      video: false,
      vote_average: 6.6,
      vote_count: 10,
   },
   {
      adult: false,
      backdrop_path: "/e782pDRAlu4BG0ahd777n8zfPzZ.jpg",
      id: 555604,
      title: "Guillermo del Toro's Pinocchio",
      original_language: "en",
      original_title: "Guillermo del Toro's Pinocchio",
      overview:
         "During the rise of fascism in Mussolini's Italy, a wooden boy brought magically to life struggles to live up to his father's expectations.",
      poster_path: "/vx1u0uwxdlhV2MUzj4VlcMB0N6m.jpg",
      media_type: "movie",
      genre_ids: [16, 14, 18],
      popularity: 754.642,
      release_date: "2022-11-18",
      video: false,
      vote_average: 8.354,
      vote_count: 1694,
   },
];

function Favorites() {
   let [genres, setGenres] = useState([]);
   let [movies, setMovies] = useState(sampleMovies);
   let [searchItem, setSearchItem] = useState("");
   let [currGenre, setCurrGenre] = useState("All Genres");
   let [currRatingOrder, setCurrRatingOrder] = useState(0);
   let [currPopularityOrder, setCurrPopularityOrder] = useState(0);
   let [noOfElems, setNoOfElems] = useState(2);
   let [currPage, setCurrPage] = useState(1);

   // delete movie
   const deleteMovie = (id) => {
      // can't change movies array directly
      const restOfTheMovies = movies.filter((movie) => {
         return movie.id !== id;
      });
      setMovies(restOfTheMovies);
   };
   useEffect(() => {
      let temp = movies.map((movie) => genreids[movie.genre_ids[0]]);
      console.log(temp);
      temp = new Set(temp);
      setGenres(["All Genres", ...temp]);
   }, []);

   const onCurrGenre = (genre) => {
      setCurrGenre(genre);
      setCurrPage(1);
   };

   // search something
   // map a searched movies -> searched
   let searchedMovies =
      searchItem === ""
         ? movies
         : movies.filter((movie) => {
              let movieName = movie.name ? movie.name : movie.title;
              let lowerCharSearch = searchItem.toLowerCase();
              return movieName.toLowerCase().includes(lowerCharSearch);
           });

   // filter
   let filteredMovies =
      currGenre === "All Genres"
         ? searchedMovies
         : searchedMovies.filter((searchedMovie) => {
              return genreids[searchedMovie.genre_ids[0]] === currGenre;
           });

   // sorting -> rating
   if (currRatingOrder !== 0) {
      if (currRatingOrder === 1) {
         filteredMovies = filteredMovies.sort((movieA, movieB) => {
            return movieA.vote_average - movieB.vote_average;
         });
      } else if (currRatingOrder === -1) {
         filteredMovies = filteredMovies.sort((movieA, movieB) => {
            return movieB.vote_average - movieA.vote_average;
         });
      }
   }
   // sorting -> popularity
   if (currPopularityOrder !== 0) {
      if (currPopularityOrder === 1) {
         filteredMovies = filteredMovies.sort((movieA, movieB) => {
            return movieA.popularity - movieB.popularity;
         });
      } else if (currPopularityOrder === -1) {
         filteredMovies = filteredMovies.sort((movieA, movieB) => {
            return movieB.popularity - movieA.popularity;
         });
      }
   }

   // pagination
   let si = noOfElems * (currPage - 1);
   let ei = si + noOfElems;
   let maxPageNum = Math.ceil(filteredMovies.length / noOfElems);
   filteredMovies = filteredMovies.slice(si, ei);

   const onPrev = (pageNum) => {
      if (pageNum > 0) {
         setCurrPage(pageNum);
      }
   };
   const onNext = (pageNum) => {
      if (pageNum <= maxPageNum) {
         setCurrPage(pageNum);
      }
   };

   return (
      <>
         {/* genres */}
         <div className="mt-6 flex space-x-2 justify-center">
            {genres.map((genre) => {
               return (
                  <button
                     className={
                        genre === currGenre
                           ? "py-1 px-2 bg-blue-400 rounded-lg text-lg font-bold text-white hover:bg-blue-400"
                           : "py-1 px-2 bg-gray-400 rounded-lg text-lg font-bold text-white hover:bg-blue-400"
                     }
                     onClick={() => {
                        onCurrGenre(genre);
                     }}
                  >
                     {genre}
                  </button>
               );
            })}
         </div>
         {/* Searching */}
         <div className="mt-4 flex justify-center space-x-1">
            <input
               type="text"
               placeholder="search"
               className="border-2 py-1 px-2 outline-none text-center"
               value={searchItem}
               onChange={(e) => {
                  setSearchItem(e.target.value);
                  setCurrPage(1);
               }}
            />
            <input
               className="border-2 py-1 px-2 outline-none text-center"
               type="number"
               value={noOfElems}
               onChange={(e) => {
                  setNoOfElems(e.target.value);
                  setCurrPage(1);
               }}
            />
         </div>
         {/* Dashboard Table */}
         <div className="overflow-auto rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
               <thead className="bg-gray-50">
                  <tr>
                     <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                     >
                        Name
                     </th>
                     <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                     >
                        <div className="flex">
                           <img
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                              className="mr-2 cursor-pointer"
                              alt=""
                              onClick={() => {
                                 setCurrRatingOrder(1);
                                 setCurrPage(1);
                              }}
                           />
                           <div>Rating</div>
                           <img
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                              className="ml-2 mr-2"
                              alt=""
                              onClick={() => {
                                 setCurrRatingOrder(-1);
                                 setCurrPage(1);
                              }}
                           />
                        </div>
                     </th>
                     <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                     >
                        <div className="flex">
                           <img
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                              className="mr-2 cursor-pointer"
                              alt=""
                              onClick={() => {
                                 setCurrPopularityOrder(1);
                                 setCurrPage(1);
                              }}
                           />
                           <div>Popularity</div>
                           <img
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                              className="ml-2 mr-2"
                              alt=""
                              onClick={() => {
                                 setCurrPopularityOrder(-1);
                                 setCurrPage(1);
                              }}
                           />
                        </div>
                     </th>
                     <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                     >
                        Genre
                     </th>
                     <th
                        scope="col"
                        className="px-6 py-4 font-medium text-gray-900"
                     >
                        Remove
                     </th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {filteredMovies.map((movie) => {
                     console.log(movie);
                     return (
                        <tr className="hover:bg-gray-50" key={movie.id}>
                           <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900 space-x-2">
                              <img
                                 className="h-[6rem] w-[10rem] object-fit"
                                 src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                 alt=""
                              />
                              <div className="font-medium text-gray-700 whitespace-nowrap text-sm">
                                 {movie.title === false
                                    ? movie.name
                                    : movie.title}
                              </div>
                           </th>
                           <td className="px-6 py-4 text-lg font-bold">
                              {movie.vote_average.toFixed(2)}
                           </td>
                           <td className="px-6 py-4 text-lg font-bold">
                              {movie.popularity.toFixed(2)}
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex gap-2">
                                 <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                    {genreids[movie.genre_ids[0]]}
                                 </span>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <span
                                 className="inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold text-red-600 cursor-pointer"
                                 onClick={() => {
                                    deleteMovie(movie.id);
                                 }}
                              >
                                 delete
                              </span>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
         {/* Pagination */}
         <Pagination
            pageNum={currPage}
            onPrev={onPrev}
            onNext={onNext}
         ></Pagination>
      </>
   );
}

export default Favorites;
