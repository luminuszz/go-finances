export type Period = {
	year: number;
	mouth: number;
};

type TransactionType = "INCOMING" | "EXIT";

export type Transaction = {
	id: string;
	value: number;
	type: TransactionType;
	category: string;
	userId: string;
	description: string | null;
	created_at: Date;
};

export interface TransactionResume {
	incoming: number;
	out: number;
	transactions: Transaction[];
}
