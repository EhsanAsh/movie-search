const fetchData = async () => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'f192845',
			// s: 'avengers',
			i: 'tt0848228',
		},
	});
	console.log(response.data);
};

fetchData();
