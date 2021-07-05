import { BaseRepository } from "./base.repository";
import { Entity, resolveInstance } from "../utils";

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

export interface TransactionAVC {
	up: number;
	down: number;
	total: number;
}

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

	async getTransactionsMedia(): Promise<TransactionAVC> {
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

		return {
			...media,
			total,
		};
	}
}

export const transactionRepository = resolveInstance<TransactionRepository>(
	TransactionRepository
);
