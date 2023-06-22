import axios from "axios"
import React, { useEffect, useState } from "react"
import { Oval } from "react-loader-spinner"

function Banner() {
	let [bannerMovie, setBannerMovie] = useState("")

	useEffect(() => {
		;(() => {
			axios
				.get(
					"https://api.themoviedb.org/3/trending/all/week?api_key=6cd46db7aa2ee39be65321fb0d418065"
				)
				.then((res) => {
					console.table(res.data.results)
					setBannerMovie(res.data.results[0])
				})
		})()
	}, [])
	return (
		<>
			{bannerMovie === "" ? (
				<div className="flex justify-center">
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
				<div
					className={`h-[25vh] sm:h-[40vh] md:h-[60vh] bg-center bg-cover flex items-center`}
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original/${bannerMovie.backdrop_path})`,
						backgroundPosition: "top center"
					}}
				>
					{/* <div className=" text-xl md:text-3xl text-white bg-gray-900 bg-opacity-60 p-4 text-center w-full">
                  {bannerMovie.name}
               </div> */}
				</div>
			)}
		</>
	)
}

export default Banner
