import { BaseRepository } from "./base.repository";
import { Entity, resolveInstance } from "../utils";
import { categories, Category } from "../../../utils/categories";

type Report = {
	category: Category;
	amount: number;
	percent: string;
};

export interface Transaction {
	id: string;
	name: string;
	price: number;
	selectedType: "up" | "down" | "total";
	createdAt: Date;
	selectedCategory: {
		name: string;
		key: string;
		icon: string;
	};
}

type TransactionInformation = {
	lastTransaction: Date;
	value: number;
};

export interface TransactionAVC {
	up: TransactionInformation;
	down: TransactionInformation;
	total: TransactionInformation;
}

export type TransactionReport = {
	reports: Report[];
	totalOut: number;
};

export type CreateTransactionDTO = Omit<Transaction, "id" | "createdAt">;

export type UpdateTransactionDTO = Partial<CreateTransactionDTO>;

@Entity("transactions")
class TransactionRepository extends BaseRepository<Transaction> {
	async saveTransaction(
		createTransactionDTO: CreateTransactionDTO
	): Promise<Transaction> {
		const newTransaction = Object.assign(createTransactionDTO, {
			id: this.generateUUID(),
			createdAt: new Date(),
		});

		const transactions = await this.get();

		transactions.push(newTransaction);

		await this.save(transactions);

		return newTransaction;
	}

	async deleteTransaction(id: string) {
		const transactions = await this.get();

		const currentTransactionIndex = transactions.findIndex(
			(transaction) => transaction.id === id
		);

		if (currentTransactionIndex < 0) throw new Error("transaction not found");

		delete transactions[currentTransactionIndex];

		await this.save(transactions);
	}

	async updateTransaction(
		transactionId: string,
		payload: UpdateTransactionDTO
	) {
		try {
			const transactions = await this.get();

			const transactionIndex = transactions.findIndex(
				(item) => item.id === transactionId
			);

			if (transactionIndex < 0) throw new Error("Transaction node found");

			transactions[transactionIndex] = Object.assign(
				transactions[transactionIndex],
				payload
			);

			await this.save(transactions);
		} catch (error) {
			this.parseError(error.message, this.updateTransaction.name);
		}
	}

	async getTransactions() {
		return this.get();
	}

	async deleteAll() {
		await this.clear();
	}

	async getTransactionsAVC(): Promise<TransactionAVC> {
		const transactions = await this.get();

		const media = transactions.reduce(
			(acc, current) => {
				current.selectedType === "up"
					? (acc.up += current.price)
					: (acc.down += current.price);

				return acc;
			},
			{
				up: 0,
				down: 0,
			}
		);

		const total = media.up - media.down;

		const lastTransactionEntries = this.getLastTransactionHistory(
			transactions,
			"up"
		);

		const lastTransactionOut = this.getLastTransactionHistory(
			transactions,
			"down"
		);

		console.log(
			"transactions[transactions.length - 1].createdAt,",
			transactions[transactions.length - 1].createdAt
		);

		return {
			down: {
				value: media.down,
				lastTransaction: new Date(lastTransactionOut),
			},
			up: {
				value: media.up,
				lastTransaction: new Date(lastTransactionEntries),
			},
			total: {
				value: total,
				lastTransaction: new Date(
					transactions[transactions.length - 1].createdAt
				),
			},
		};
	}

	async getTransactionsReport(): Promise<TransactionReport> {
		const transactions = await this.getTransactions();

		const outTransactions = transactions.filter(
			(tr) => tr.selectedType === "down"
		);

		const totalOutTransactions = outTransactions.reduce(
			(acc, current) => (acc += Number(current.price)),
			0
		);

		const reports: Report[] = [];

		categories.forEach((category) => {
			let totalCategoryOut = 0;

			outTransactions.forEach((trOut) => {
				if (trOut.selectedCategory.key === category.key) {
					totalCategoryOut += Number(trOut.price);
				}
			});

			if (totalCategoryOut > 0) {
				const percent = (totalCategoryOut / totalOutTransactions) * 100;

				reports.push({
					amount: totalCategoryOut,
					category,
					percent: `${percent.toFixed(0)} %`,
				});
			}
		});

		return {
			reports,
			totalOut: totalOutTransactions,
		};
	}

	private getLastTransactionHistory = (
		transactions: Transaction[],
		type: Transaction["selectedType"]
	) =>
		transactions
			.filter((item) => item.selectedType === type)
			.map((item) => new Date(item.createdAt).getTime())
			.reduce((acc, current) => Math.max(acc, current));
}

export const transactionRepository = resolveInstance<TransactionRepository>(
	TransactionRepository
);
