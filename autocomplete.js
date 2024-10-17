import { debounce } from './debounce.js';
import { fetchData } from './utils.js';
import { onMovieSelect } from './utils.js';

export const createAutocomplete = ({ root }) => {
	root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
	    <div class="dropdown-menu">
		    <div class="dropdown-content results"></div>
	    </div>
    </div>
  `;

	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

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
};
