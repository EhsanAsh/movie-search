import { createAutocomplete } from './autocomplete.js';

// createAutocomplete *******************************************************
const autoCompleteConfig = {
	renderOption(movie) {
		const imageSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
		<img src='${imageSrc}' />
		${movie.Title} (${movie.Year})
		`;
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
		const response = await axios.get('http://www.omdbapi.com/', {
			params: {
				apikey: 'f192845',
				// s: 'avengers',
				// i: 'tt893456',
				s: searchTerm,
			},
		});

		// if the fetchData can't find any result it will return an error property.
		if (response.data.Error) {
			return [];
		}

		return response.data.Search;
	},
};

createAutocomplete({
	...autoCompleteConfig,
	root: document.querySelector('#left-autocomplete'),
	onOptionSelect(movie) {
		const tutorial = document.querySelector('.tutorial');
		tutorial.classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
	},
});

createAutocomplete({
	...autoCompleteConfig,
	root: document.querySelector('#right-autocomplete'),
	onOptionSelect(movie) {
		const tutorial = document.querySelector('.tutorial');
		tutorial.classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
	},
});
// createAutocomplete *******************************************************

let leftMovie;
let rightMovie;

// onMovieSelect function ***************************************************
const onMovieSelect = async (movie, summaryEl, side) => {
	const id = movie.imdbID;
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'f192845',
			i: id,
		},
	});

	const movieDetails = response.data;
	summaryEl.innerHTML = movieTemplate(movieDetails);

	side === 'left' ? (leftMovie = movieDetails) : (rightMovie = movieDetails);
	if (leftMovie && rightMovie) runComparison();
};

const runComparison = (left, right) => {
};

const movieTemplate = (movieDetail) => {

	const { Poster,Title, } = movieDetail;
	const dollars = ;

	return `
		<article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
		<article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
	`;
};
// onMovieSelect function ***************************************************
