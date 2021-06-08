import React from "react";
import * as Atoms from "./styles";

import * as Components from "../../components";
import { TransactionData } from "../../components/TransactionCard";

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

const transactions: TransactionData[] = [
	{
		amount: 15000,
		type: "positive",
		date: "18/05/2020",
		title: "Transação feita",
		category: {
			icon: "dollar-sign",
			label: "PIX",
		},
	},

	{
		amount: 15000,
		type: "positive",
		date: "18/05/2020",
		title: "Transação feita",
		category: {
			icon: "dollar-sign",
			label: "PIX",
		},
	},
	{
		amount: 35.58,
		type: "negative",
		date: "18/05/2020",
		title: "Pizzaria Henriques",
		category: {
			icon: "coffee",
			label: "Alimentação",
		},
	},
	{
		amount: 1200,
		type: "negative",
		date: "18/05/2020",
		title: "Aluguel do apartamento",
		category: {
			icon: "shopping-bag",
			label: "Outros",
		},
	},
];

export function Dashboard() {
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
					data={transactions}
					renderItem={({ item }) => (
						<Components.TransactionCard transaction={item} />
					)}
				/>
			</Atoms.Transactions>
		</Atoms.Container>
	);
}
