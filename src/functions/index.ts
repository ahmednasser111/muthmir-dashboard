export const formatTime = (timeString: string): string => {
	const match = timeString.match(/h(\d+)m(\d+)s(\d+)/);
	if (match) {
		const [, hours, minutes, seconds] = match;
		return `${hours.padStart(2, "0")}:${minutes.padStart(
			2,
			"0"
		)}:${seconds.padStart(2, "0")}`;
	}
	return timeString;
};
