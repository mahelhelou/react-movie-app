import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// Components
import MovieList from './components/MovieList'
import MovieListHeading from './components/MovieListHeading'
import SearchInput from './components/SearchInput'
import AddToFavorites from './components/AddToFavorites'
import RemoveFavorites from './components/RemoveFavorites'

const App = () => {
	/* const [movies, setMovies] = useState([
		{
			Title: 'Star Wars: Episode IV - A New Hope',
			Year: '1977',
			imdbID: 'tt0076759',
			Type: 'movie',
			Poster: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
		},
		{
			Title: 'Star Wars: Episode V - The Empire Strikes Back',
			Year: '1980',
			imdbID: 'tt0080684',
			Type: 'movie',
			Poster: 'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
		},
		{
			Title: 'Star Wars: Episode VI - Return of the Jedi',
			Year: '1983',
			imdbID: 'tt0086190',
			Type: 'movie',
			Poster: 'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
		}
	]) */

	// App states
	const [movies, setMovies] = useState([]) // We'll call the movies data from the API
	const [searchValue, setSearchValue] = useState('')
	const [favorites, setFavorites] = useState([])

	// Fetch movies API
	const getMovieRequest = async searchValue => {
		// const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=1171b838'
		// const url = 'http://www.omdbapi.com/?s=star wars&apikey=1171b838'
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1171b838`
		const response = await fetch(url)
		const responseJson = await response.json()

		// console.log(responseJson)
		// console.log(responseJson.Search)

		// Search comes from API parameter
		if (responseJson.Search) {
			setMovies(responseJson.Search)
		}
	}

	// Call the API only when the app is rendered for the first time
	/* useEffect(() => {
		getMovieRequest()
	}, []) */

	// Call the API when the search input values changes
	useEffect(() => {
		getMovieRequest(searchValue)
	}, [searchValue])

	// Get favorite movies from localStorage
	useEffect(() => {
		if (localStorage.getItem('react-movie-app-favorites')) {
			const favoriteMovies = JSON.parse(localStorage.getItem('react-movie-app-favorites'))

			setFavorites(favoriteMovies)
		}
	}, [])

	// Save favorite movies to localStorage
	const saveFavoriteMoviesToLocalStorage = items => {
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
	}

	const addFavoriteMovie = movie => {
		if (favorites.indexOf(movie) === -1) {
			const newFavoritesList = [...favorites, movie]
			setFavorites(newFavoritesList)
			saveFavoriteMoviesToLocalStorage(newFavoritesList)
		}
	}

	const removeFavoriteMovie = movie => {
		const newFavoritesList = favorites.filter(favorite => favorite.imdbID !== movie.imdbID)

		setFavorites(newFavoritesList)
		saveFavoriteMoviesToLocalStorage(newFavoritesList)
	}

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center my-4'>
				<MovieListHeading heading='Movies' />
				<SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList movies={movies} handleFavoriteClick={addFavoriteMovie} favoriteComponent={AddToFavorites} />
			</div>
			<div className='row d-flex align-items-center my-4'>
				<MovieListHeading heading='Favorites' />
			</div>
			<div className='row'>
				<MovieList movies={favorites} handleFavoriteClick={removeFavoriteMovie} favoriteComponent={RemoveFavorites} />
			</div>
		</div>
	)
}

export default App
