import React, { useState, useEffect, useMemo } from "react";
import { compareDesc } from "date-fns";

import {
	transactionRepository,
	Transaction as TransactionEntity,
	TransactionAVC,
} from "../../services/asyncStorage/repositories/transaction.repository";
import { TransactionData } from "../../components/TransactionCard";

import * as Components from "../../components";
import * as Atoms from "./styles";

type Transaction = {
	type: "up" | "down" | "total";
	title: string;
	amount: string;
	lastTransaction: string;
};

const highlights: Transaction[] = [
	{
		type: "up",
		title: "Entradas",
		amount: "17.400,00",
		lastTransaction: "Ultima transação em 18 de junho",
	},
	{
		type: "down",
		title: "Saídas",
		amount: "17.400,00",
		lastTransaction: "Ultima transação em 18 de junho",
	},
	{
		type: "total",
		title: "Saídas",
		amount: "17.400,00",
		lastTransaction: "Ultima transação em 18 de junho",
	},
];

export function Dashboard() {
	const [transactions, setTransactions] = useState<TransactionEntity[]>([]);
	const [transactionsHighlights, setTransactionsHighlights] =
		useState<TransactionAVC>({
			down: 0,
			up: 0,
			total: 0,
		});

	useEffect(() => {
		(async () => {
			const response = await transactionRepository.getTransactions();
			const avc = await transactionRepository.getTransactionsMedia();

			setTransactionsHighlights(avc);
			setTransactions(response);
		})();
	}, [transactionRepository]);

	console.log(transactionsHighlights);

	const formattedTransactions = useMemo<TransactionData[]>(
		() =>
			transactions
				.sort((a, b) => compareDesc(b.createdAt, a.createdAt))
				.map((tr) => ({
					amount: tr.price,
					title: tr.name,
					type: tr.selectedType === "up" ? "positive" : "negative",
					category: {
						icon: tr.selectedCategory.icon || "string",
						label: tr.selectedCategory.name,
					},
					date: new Date(tr.createdAt).toLocaleDateString(),
				})),
		[transactions, compareDesc]
	);

	return (
		<Atoms.Container>
			<Atoms.Header>
				<Components.Profile />
			</Atoms.Header>
			<Atoms.CardList>
				{highlights.map((transaction) => (
					<Components.HighLightCard
						key={transaction.type}
						type={transaction.type}
						title={transaction.title}
						amount={transaction.amount}
						lastTransaction={transaction.lastTransaction}
					/>
				))}
			</Atoms.CardList>

			<Atoms.Transactions>
				<Atoms.Title>Listagem</Atoms.Title>

				<Atoms.TransactionList
					keyExtractor={(item, i) => `${item}#${i}`}
					data={formattedTransactions}
					renderItem={({ item }) => (
						<Components.TransactionCard transaction={item} />
					)}
				/>
			</Atoms.Transactions>
		</Atoms.Container>
	);
}
