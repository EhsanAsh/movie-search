const fetchData = async () => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'f192845',
			s: 'avengers',
		},
	});
	console.log(response.data);
};

fetchData();
