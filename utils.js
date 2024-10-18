export const runComparison = () => {
	const leftSideStats = document.querySelectorAll(
		'#left-summary .notification'
	);
	const rightSideStats = document.querySelectorAll(
		'#right-summary .notification'
	);

	leftSideStats.forEach((leftStat, idx) => {
		const rightStat = rightSideStats[idx];

		const leftSideValue = parseInt(leftStat.dataset.value);
		const rightSideValue = parseInt(rightStat.dataset.value);

		if (rightSideValue > leftSideValue) {
			leftStat.classList.remove('is-primary');
			leftStat.classList.add('is-warning');
		} else {
			rightStat.classList.remove('is-primary');
			rightStat.classList.add('is-warning');
		}
	});
};
