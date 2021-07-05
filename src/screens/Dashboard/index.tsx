import React, { useState, useEffect, useMemo } from "react";
import { compareAsc } from "date-fns";

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
	const [loading, setLoading] = useState(false);
	const [transactions, setTransactions] = useState<TransactionEntity[]>([]);
	const [transactionsHighlights, setTransactionsHighlights] =
		useState<TransactionAVC>({
			down: 0,
			up: 0,
			total: 0,
		});

	const formattedTransactions = useMemo<TransactionData[]>(
		() =>
			transactions.map((tr) => ({
				amount: tr.price,
				id: tr.id,
				title: tr.name,
				type: tr.selectedType === "up" ? "positive" : "negative",
				category: {
					icon: tr.selectedCategory.icon || "string",
					label: tr.selectedCategory.name,
				},
				date: new Date(tr.createdAt).toLocaleDateString(),
			})),
		[transactions]
	);

	useEffect(() => {
		const execute = async () => {
			setLoading(true);
			const response = await transactionRepository.getTransactions();
			const avc = await transactionRepository.getTransactionsMedia();

			setTransactionsHighlights(avc);
			setTransactions(response);
			setLoading(false);
		};

		execute();
	}, [transactionRepository]);

	return (
		<Atoms.Container>
			<Atoms.Header>
				<Components.Profile />
			</Atoms.Header>
			<Atoms.CardList>
				<Components.HighLightCard
					key={highlights[0].type}
					type={highlights[0].type}
					title={highlights[0].title}
					amount={String(transactionsHighlights.up)}
					lastTransaction={highlights[0].lastTransaction}
				/>
				<Components.HighLightCard
					key={highlights[1].type}
					type={highlights[1].type}
					title={highlights[1].title}
					amount={String(transactionsHighlights.down)}
					lastTransaction={highlights[1].lastTransaction}
				/>
				<Components.HighLightCard
					key={highlights[2].type}
					type={highlights[2].type}
					title={highlights[2].title}
					amount={String(transactionsHighlights.total)}
					lastTransaction={highlights[2].lastTransaction}
				/>
			</Atoms.CardList>
			<Atoms.Transactions>
				<Atoms.Title>Listagem</Atoms.Title>

				{loading ? (
					<Atoms.LoadingTitle />
				) : (
					<Atoms.TransactionList
						keyExtractor={(item) => item.id}
						data={formattedTransactions}
						renderItem={({ item }) => (
							<Components.TransactionCard transaction={item} />
						)}
					/>
				)}
			</Atoms.Transactions>
		</Atoms.Container>
	);
}
