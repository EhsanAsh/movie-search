// Debounce function: Waiting for some to pass after the last event to actually do sth.
export const debounce = (func, delay = 1000) => {
	let timeoutId;
	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		// *** apply: call the function as we normally do, and take all the arguments in the array and pass them in as separate arguments to the original function.
		timeoutId = setTimeout(() => func.apply(null, args), delay);
	};
};
// Debounce function: Waiting for some to pass after the last event to actually do sth.
