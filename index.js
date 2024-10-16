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

		resultsWrapper.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput, 800));

// Close the dropdown when the user clicks outside of it.
// we are adding an event listener to the document which is the whole page, to check for any clicks that is not on the root element that we have created.
document.addEventListener('click', (event) => {
	if (!root.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});
