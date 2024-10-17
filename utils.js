// fetchData function *******************************************************
export const fetchData = async (searchTerm) => {
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
// fetchData function *******************************************************

// onMovieSelect function ***************************************************
const summary = document.querySelector('#summary');
export const onMovieSelect = async (movie) => {
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
// onMovieSelect function ***************************************************
