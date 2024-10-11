import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { IEntry } from "../interfaces/index";
import { formatTime } from "../functions/index";

const SensorPage = () => {
	const { sensorType } = useParams<{ sensorType: string }>();
	const [sensorData, setSensorData] = useState<IEntry[]>([]);
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
				const doc = querySnapshot.docs.find((doc) => doc.id === sensorType);

				if (doc) {
					const entries = doc.data();
					const formattedEntries: IEntry[] = Object.entries(entries)
						.map(([time, value]) => ({ time, value: value as number }))
						.sort((a, b) => a.time.localeCompare(b.time));

					setSensorData(formattedEntries);
				} else {
					setError(`No data found for sensor type: ${sensorType}`);
				}
			} catch (error) {
				console.error("Error fetching sensor data: ", error);
				setError("Failed to fetch sensor data. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		};

		if (sensorType) {
			fetchData();
		}
	}, [sensorType]);

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
				{sensorType} Sensor Data
			</h1>
			<div className="bg-white shadow-lg rounded-lg overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Time
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Value
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{sensorData.map((entry, index) => (
								<tr
									key={index}
									className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatTime(entry.time)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{entry.value}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default SensorPage;
