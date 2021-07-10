import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { formatDate } from "../../utils/formats";

import {
	transactionRepository,
	Transaction as TransactionEntity,
	TransactionAVC,
} from "../../services/asyncStorage/repositories/transaction.repository";
import { formatCurrency, getUTCDateFormat } from "../../utils/formats";
import { TransactionData } from "../../components/TransactionCard";

import * as Components from "../../components";
import * as Atoms from "./styles";

type Transaction = {
	type: "up" | "down" | "total";
	title: string;
	amount: string;
	lastTransaction: string;
};

export function Dashboard() {
	const theme = useTheme();
	const [transactions, setTransactions] = useState<TransactionEntity[]>([]);
	const [transactionsHighlights, setTransactionsHighlights] =
		useState<TransactionAVC | null>(null);
	const [loading, setLoading] = useState(false);

	const formattedTransactions = useMemo<TransactionData[]>(
		() =>
			transactions.map((tr) => ({
				amount: formatCurrency(tr.price),
				id: tr.id,
				title: tr.name,
				type: tr.selectedType === "up" ? "positive" : "negative",
				category: {
					icon: tr.selectedCategory.icon || "",
					label: tr.selectedCategory.name,
				},
				date: getUTCDateFormat(tr.createdAt),
			})),
		[transactions]
	);

	const totalIntervalAVC = `01 a ${formatDate(
		transactionsHighlights?.total.lastTransaction || 0
	)}`;

	const fetchTransactions = async () => {
		setLoading(true);
		const response = await transactionRepository.getTransactions();
		const avc = await transactionRepository.getTransactionsAVC();

		setTransactionsHighlights(avc);
		setTransactions(response);
		setLoading(false);
	};

	useFocusEffect(
		useCallback(() => {
			fetchTransactions();
		}, [setTransactionsHighlights, setTransactions, setLoading])
	);

	useEffect(() => {
		fetchTransactions();
	}, []);

	return (
		<Atoms.Container>
			{loading ? (
				<ActivityIndicator color={theme.colors.primary} size="large" />
			) : (
				<>
					<Atoms.Header>
						<Components.Profile />
					</Atoms.Header>
					<Atoms.CardList>
						<Components.HighLightCard
							type="up"
							title="Entradas"
							amount={String(transactionsHighlights?.up.value)}
							transactionDetails={
								transactionsHighlights?.up.lastTransaction || 0
							}
						/>
						<Components.HighLightCard
							type="down"
							title="Saídas"
							amount={String(transactionsHighlights?.down.value)}
							transactionDetails={
								transactionsHighlights?.down.lastTransaction || 0
							}
						/>
						<Components.HighLightCard
							type="total"
							title="Total"
							amount={String(transactionsHighlights?.total.value)}
							transactionDetails={totalIntervalAVC}
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
				</>
			)}
		</Atoms.Container>
	);
}
