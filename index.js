import { debounce } from './utils.js';

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

const onInput = async (event) => {
	const movies = await fetchData(event.target.value);
	// console.log(movies);
	dropdown.classList.add('is-active');
	for (let movie of movies) {
		const option = document.createElement('a');
		option.classList.add('dropdown-item');
		option.innerHTML = `
		<img src='${movie.Poster}' />
		${movie.Title}
		`;
		resultsWrapper.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput, 800));
