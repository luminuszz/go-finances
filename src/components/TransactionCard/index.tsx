import React from "react";

import * as Atoms from "./styles";

export type TransactionData = {
	type: "positive" | "negative";
	title: string;
	amount: number;
	id: string;
	category: {
		label: string;
		icon: string;
	};
	date: string;
};

interface Props {
	transaction: TransactionData;
}

export default function TransactionCard({ transaction }: Props) {
	const { amount, category, date, title, type } = transaction;

	const formattedAmount = `${type === "positive" ? "+" : "-"} ${amount}`;

	return (
		<Atoms.Container>
			<Atoms.Title>{title}</Atoms.Title>
			<Atoms.Amount type={transaction.type}>{formattedAmount}</Atoms.Amount>

			<Atoms.Footer>
				<Atoms.Category>
					<Atoms.Icon name={category.icon} />
					<Atoms.CategoryName>{category.label}</Atoms.CategoryName>
				</Atoms.Category>
				<Atoms.TransactionDate>{date}</Atoms.TransactionDate>
			</Atoms.Footer>
		</Atoms.Container>
	);
}
