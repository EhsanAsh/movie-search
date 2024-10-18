import { createAutocomplete } from './autocomplete.js';
import { runComparison } from './utils.js';

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

const movieTemplate = (movieDetail) => {
	const {
		Poster,
		Title,
		Genre,
		Plot,
		Awards,
		BoxOffice,
		Metascore,
		imdbRating,
		imdbVotes,
	} = movieDetail;

	const dollars = parseInt(BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
	const metascore = parseInt(Metascore);
	const rating = parseFloat(imdbRating);
	const votes = parseInt(imdbVotes.replace(/,/g, ''));
	const awards = Awards.split(' ').reduce((total, curr) => {
		const value = parseInt(curr);
		if (isNaN(value)) {
			return total;
		} else {
			return total + value;
		}
	}, 0);

	return `
		<article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${Title}</h1>
          <h4>${Genre}</h4>
          <p>${Plot}</p>
        </div>
      </div>
    </article>
		<article data-value="${awards}" class="notification is-primary">
      <p class="title">${Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value="${dollars}" class="notification is-primary">
      <p class="title">${BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value="${metascore}" class="notification is-primary">v
      <p class="title">${Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value="${rating}" class="notification is-primary">
      <p class="title">${imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value="${votes}" class="notification is-primary">
      <p class="title">${imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
	`;
};
// onMovieSelect function ***************************************************
