export interface IEntry {
	time: string;
	value: number;
}
export interface ISensorData {
	[key: string]: IEntry;
}
