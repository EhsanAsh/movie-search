import { debounce } from './utils.js';
// import {autocomplete} from './autocomplete.js';

const fetchData = async (searchTerm) => {
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
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search for a Movie</b></label>
<input class="input" />
<div class="dropdown">
	<div class="dropdown-menu">
		<div class="dropdown-content results"></div>
	</div>
</div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');
const summary = document.querySelector('#summary');

const onInput = async (event) => {
	const movies = await fetchData(event.target.value);

	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
		// return because we don't want to run the rest of the function.
	}

	resultsWrapper.innerHTML = '';
	dropdown.classList.add('is-active');

	for (let movie of movies) {
		const option = document.createElement('a');

		const imageSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

		option.classList.add('dropdown-item');
		option.innerHTML = `
		<img src='${imageSrc}' />
		${movie.Title}
		`;

		option.addEventListener('click', () => {
			dropdown.classList.remove('is-active');
			input.value = movie.Title;
			onMovieSelect(movie);
		});

		resultsWrapper.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput, 800));

// Close the dropdown when the user clicks outside of it.
// we are adding an event listener to the document which is the whole page, to check for any clicks that is not on the root element that we have created.
document.addEventListener('click', (event) => {
	// contains returns true if the target element is contained within the root element
	// contains is a method that is available on the Element interface
	if (!root.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});

const onMovieSelect = async (movie) => {
	const id = movie.imdbID;
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'f192845',
			i: id,
		},
	});

	const movieDetails = response.data;
	summary.innerHTML = movieTemplate(movieDetails);
};

const movieTemplate = (movieDetail) => {
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
