export interface SocketIO {
	on: (
		arg0: string,
		arg1: { (data: any): void; (data: any): void; (data: any): void; (data: any): void }
	) => void;
	emit: (arg0: string, arg1: any | undefined) => void;
}

export interface UserPoint {
	name: string;
	point: number | string;
}

export interface Option {
	[x: string]: string[] | number[];
}
