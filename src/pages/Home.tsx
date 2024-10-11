import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import { ISensorData } from "../interfaces/index";
import { formatTime } from "../functions/index";

const Home = () => {
	const [lastReadValues, setLastReadValues] = useState<ISensorData>({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const currentDate = new Date();
			const formattedDate = `y${currentDate.getFullYear()}m${String(
				currentDate.getMonth() + 1
			).padStart(2, "0")}d${String(currentDate.getDate()).padStart(2, "0")}`;

			try {
				const querySnapshot = await getDocs(collection(db, formattedDate));
				const newData: ISensorData = {};

				querySnapshot.forEach((doc) => {
					const sensorType = doc.id;
					const entries = doc.data();

					const sortedEntries = Object.entries(entries)
						.map(([time, value]) => ({ time, value: value as number }))
						.sort((a, b) => b.time.localeCompare(a.time));

					if (sortedEntries.length > 0) {
						newData[sensorType] = sortedEntries[0];
					}
				});

				setLastReadValues(newData);
			} catch (error) {
				console.error("Error fetching sensor data: ", error);
				setError("Failed to fetch sensor data. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div
				className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
				role="alert">
				<strong className="font-bold">Error:</strong>
				<span className="block sm:inline"> {error}</span>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
				Last Read Sensor Values
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Object.entries(lastReadValues).map(([sensorType, data]) => (
					<Link
						to={`/${sensorType}`}
						key={sensorType}
						className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
						<div className="px-6 py-4">
							<h2 className="text-xl font-semibold mb-2 text-gray-800">
								{sensorType}
							</h2>
							<p className="text-gray-600">
								Last read: {formatTime(data.time)}
							</p>
							<p className="text-3xl font-bold text-green-600">{data.value}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Home;
