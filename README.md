# Documentation

## Movie App Features

- Use a real API to search for movies as we type
- Create a "Netflix style" horizontal scroll effect
- Add movies to and remove them from our favorites
- Save our favorites to local storage to they appear when the app refreshes

## UX Improvements

- Add to favorites only when I click the `heart icon`, not on clicking the `AddToFavorites` component
- Remove from favorites only when I click the `remove-x icon`, not on clicking the `RemoveFavorites` component

## Resources

- [API Key](http://www.omdbapi.com/apikey.aspx)
- [Deploy React App](https://create-react-app.dev/docs/deployment/)

## Add Movies to State

The `App component` will hold the state for the app. That way we can keep everything organized in one place and pass different pieces of state to different components.

```js
const App = () => {
	const [movies, setMovies] = useState([
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
	])

	return (
		<div className='container-fluid movie-app'>
			<div className='row'></div>
		</div>
	)
}

export default App
```

## Create MovieList Component

- We'll pass in a list of movies as props
- We'll use the map function to loop over these movies
- For each movie we'll display an image using the Poster URL as the image source

```js
const MovieList = props => {
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt='movie'></img>
				</div>
			))}
		</>
	)
}

export default MovieList
```

## Render The App With Initial MovieList

- We're rendering the MovieList and passing the movies we stored in state as props

```js
const App = () => {
	// ...
	return (
		<div className='container-fluid movie-app'>
			<div className='row'>
				<MovieList movies={movies} />
			</div>
		</div>
	)
}
```

## Add the Initial Call of the API

- We're removing the hardcoded movies from our movie state value
- There's a hardcoded value in the API search `star wars`
- `response.Search` comes when we put the `s` parameter in the API call
- If we get any movies back in the search, we're going to set this to our movie state
- We're using a `useEffect` to make sure the API call only happens when the app loads for the first time

```js
const App = () => {
	const [movies, setMovies] = useState([])

	const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=star wars&apikey=263d22d8`

		const response = await fetch(url)
		const responseJson = await response.json()

		if (responseJson.Search) {
			setMovies(responseJson.Search)
		}
	}

	useEffect(() => {
		getMovieRequest()
	}, [])

	return()
	// ...
}
```

## Add a Heading for Each List in the App

- Create a `MovieListHeading` component

```js
const MovieListHeading = props => {
	return (
		<div className='col'>
			<h1>{props.heading}</h1>
		</div>
	)
}

export default MovieListHeading
```

## Add a Search Input to Search for Movies

- Create a `SearchInput` component
- Takes a value from props, and when the user types, calls a function which updates the value. This is also taken from props.

```js
const SearchBox = props => {
	return (
		<div className='col col-sm-4'>
			<input className='form-control' value={props.value} onChange={event => props.setSearchValue(event.target.value)} placeholder='Type to search...'></input>
		</div>
	)
}

export default SearchBox
```

## Add Search State to the App and Render the New Call to API

- We're adding a new state value to store what the user types
- We're passing the `searchValue` value and the `setSearchValue` function to the `SearchInput` component

By saving the state of the input in App.js, it makes it easy for us to pass the search value to the `getMovieRequest` function.

```js
const App = () => {
	// ...
	const [searchValue, setSearchValue] = useState('')

	return (
		// ...
		<SearchInput value={searchValue} setSearchValue={setSearchValue} />
	)
}
```

## Call the API When the Search Value Changes

- We're updating our `getMovieRequest` function to accept a parameter: searchValue
- We're passing this value to the request using a template string
- We're updating the `useEffect` hook to run whenever the `searchValue` changes
- When the `useEffect` hooks runs, it passes the new `searchValue` to our `getMovieRequest` function
- This does a call to the API and updates the state if we get results as usual

```js
const App = () => {
	// ...

	const getMovieRequest = async searchValue => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`

    useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

}
```

## Add Favorite Movies Feature

### 1. Create `AddToFavorites` Component

```js
const AddToFavorites = () => {
	return (
		<>
			<span className='mr-2'>Add to Favorites</span>
			<svg width='1em' height='1em' viewBox='0 0 16 16' className='bi bi-heart-fill' stroke='white' xmlns='http://www.w3.org/2000/svg'>
				<path fillRule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
			</svg>
		</>
	)
}

export default AddToFavorites
```

### 2. Import `AddToFavorites` to `App` Component

```js
import `AddToFavorites` from './components/AddToFavorites'

const App = () => {
  // ...

  return (
		<div className='container-fluid movie-app'>
			{/* ... */}
			<div className='row'>
				<MovieList movies={movies} favoriteComponent={AddFavorites} />
			</div>
		</div>
	);
}
```

### 3. Render `AddToFavorites` Component

> **Remember:** React components are just functions - so we can pass them around like we do normal functions!

- We're taking our favoriteComponent from props and assigning it to a variable. This lets us use it as a react component
- We're rendering our favoriteComponent in the overlay

This approach lets us customize what gets rendered in the overlay. We can pass any react component and the MovieList component will render it. This makes our MovieList component reusable.

```js
const MovieList = props => {
	const FavoriteComponent = props.favoriteComponent
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt='movie.Title' />
					<div className='overlay d-flex align-items-center justify-content-center'>
						<FavoriteComponent />
					</div>
				</div>
			))}
		</>
	)
}
```

### 4. Save Favorites to State

- When the user clicks the `Add to Favorites` component, we want to take the movie they clicked and save it into a new state object called `favorites`.
- We're adding a new state object to hold our `favorites`. We'll add whatever movie the user clicked to this array
- We're creating a function called `addFavoriteMovie`, which accepts a movie. This takes the current `favorites` array, copies it, adds the new movie to it, and saves everything back into state
- We're passing this function as a prop `handleFavoritesClick` to our MovieList component

```js
const App = () => {
	// ...
	const [favorites, setFavorites] = useState([])

	const addFavoriteMovie = movie => {
		if (favorites.indexOf(movie) === -1) {
			const newFavoritesList = [...favorites, movie]
			setFavorites(newFavoritesList)
			saveFavoriteMoviesToLocalStorage(newFavoritesList)
		}
	}

	return (
		// ...
		<div className='row'>
			<MovieList movies={movies} handleFavoriteClick={addFavoriteMovie} favoriteComponent={AddToFavorites} />
		</div>
	)
}
```

### 5. Call `favorites` State in `MovieList` Component

We're passing the current `movie` the map function is currently on to the `handleFavoriteClick` function

```js
const MovieList = props => {
  // ...

  return (
    // ,,,
    <div
      onClick={() => props.handleFavoriteClick(movie)}
      className='overlay d-flex align-items-center justify-content-center'
    >
  )
}
```

### 6. Render Favorite movies

- We're going to reuse the `MovieList` component to display our favorites. How fancy!
- We only copied the `MovieListHeading` component and used the same `MovieList` component with different data to map!

This is an example of how to create a reusable component. If a component uses the similar logic but displays different data for different situations, you can probably reuse it.

```js
const App = () => {
  // ..
  return (
    // ...
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Favorites' />
    </div>
    <div className='row'>
      <MovieList movies={favorites} favoriteComponent={AddFavorites} />
    </div>
  )
}
```

## Remove Favorites

Next we want to add the ability to remove movies from `favorites`. We'll take a similar approach we did to adding `favorites`:

- Create a remove component that we pass to our `MovieList`, which gets rendered in the overlay
- Create a function `removeFavoriteMovie` to remove the clicked movie from state - Pass a function to handle the onClick event when the user clicks the remove component

### 1. Create `RemoveFavorites` Component

- We're adding the text `remove from favorites`
- We're adding a `remove icon` which we get from `icons.getbootrap.com`

```js
const RemoveFavorites = () => {
	return (
		<>
			<span className='mr-2'>Remove from favorites</span>
			<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-x-square' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
				<path fillRule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
				<path fillRule='evenodd' d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
			</svg>
		</>
	)
}

export default RemoveFavorites
```

### 2. Remove Favorites From State

- We're creating a function called `removeFavoriteMovie` to remove a given movie from our `favorites` state
- `filter` function returns a new version of the `favorites` array that does not include the movie we wish to remove
- We're passing our `RemoveFavorites` component and our `removeFavoriteMovie` function to our `MovieList` component

Because we already coded our `MovieList` component to accept a component to render and a function to call, everything just works!

```js
import RemoveFavorites from './components/RemoveFavorites'

const App = () => {
	// ..

	const removeFavoriteMovie = movie => {
		const newFavoritesList = favorites.filter(favorite => favorite.imdbID !== movie.imdbID)

		setFavorites(newFavoritesList)
		saveFavoriteMoviesToLocalStorage(newFavoritesList)
	}

	return (
		<>
			<div className='row'>
				<MovieList movies={favorites} handleFavoriteClick={removeFavoriteMovie} favoriteComponent={RemoveFavorites} />
			</div>
		</>
	)
}
```

## Save or Remove Movies from Local Storage

We're using the `useEffect` hook to retrieve favorites from local storage when the app loads, and we're setting this to state

```js
const App = () => {
	// ..
	useEffect(() => {
		const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'))

		setFavorites(movieFavorites)
	}, [])

	const saveFavoriteMoviesToLocalStorage = items => {
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
	}

	const addFavoriteMovie = movie => {
		const newFavoriteList = [...favorites, movie]
		setFavorites(newFavoriteList)
		saveFavoriteMovieToLocalStorage(newFavoriteList)
	}

	const removeFavoriteMovie = movie => {
		const newFavoritesList = favorites.filter(favorite => favorite.imdbID !== movie.imdbID)

		setFavorites(newFavoritesList)
		saveFavoriteMoviesToLocalStorage(newFavoritesList)
	}
}
```

## Deployment & Going Live

- This app has been deployed to `Netlify`
- In deployment process, I removed the following `dependencies` to minimize the generated `bundled javascript`.
- Just run `npm uninstall <dependency_name>` to remove them

```json
"dependencies": {
	"@testing-library/jest-dom": "^5.11.4",
	"@testing-library/react": "^11.1.0",
	"@testing-library/user-event": "^12.1.10",
	"web-vitals": "^0.2.4"
}
```

### How I Removed Unwanted Packages / Dependencies in a Better Way?

I built a script in `package.json` file to remove all these packages with one single command.

```json
"scripts": {
	"uninstall": "npm uninstall @testing-library/jest-dom @testing-library/react @testing-library/user-event web-vitals"
}
```
