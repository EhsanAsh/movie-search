const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'f192845',
			// s: 'avengers',
			s: searchTerm,
		},
	});
	console.log(response.data);
};

const input = document.querySelector('input');

// Input Debounce: Waiting for some to pass after the last event to actually do sth.
let timeoutId;
const onInput = (event) => {
	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	timeoutId = setTimeout(() => fetchData(event.target.value), 2000);
};
// Input Debounce: Waiting for some to pass after the last event to actually do sth.

input.addEventListener('input', onInput);
