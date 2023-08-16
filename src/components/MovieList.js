import React from 'react'

const MovieList = props => {
	const FavoriteComponent = props.favoriteComponent

	return (
		<>
			{props.movies.map((movie, index) => (
				<div key={index} className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt={movie.Title} />
					<div className='overlay d-flex align-items-center justify-content-center' onClick={() => props.handleFavoriteClick(movie)}>
						{/* Add to Favorites */}
						<FavoriteComponent />
					</div>
				</div>
			))}
		</>
	)
}

export default MovieList
