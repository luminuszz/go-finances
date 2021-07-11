import React, { useCallback, useEffect, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { VictoryPie } from "victory-native";
import { useTheme } from "styled-components";

import {
	transactionRepository,
	TransactionReport,
} from "../../services/asyncStorage/repositories/transaction.repository";
import { formatCurrency } from "../../utils/formats";
import * as Components from "../../components";
import * as Atoms from "./styles";
import { getMonth } from "date-fns/esm";

type Report = {
	totalCurrency: string;
	total: number;
	name: string;
	color: string;
};

export function Resume() {
	const theme = useTheme();
	const [reports, setReports] = useState<TransactionReport["reports"]>([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [loading, setLoading] = useState(false);

	const loadTransactionReport = async () => {
		const { reports } = await transactionRepository.getTransactionsReport(
			selectedDate.getMonth(),
			selectedDate.getFullYear()
		);

		setReports(reports);
	};

	const formattedReports = reports.map<Report>((report) => ({
		name: report.category.name,
		total: report.amount,
		percent: report.percent,
		totalCurrency: formatCurrency(report.amount),
		color: report.category.color,
	}));

	const handleChangePeriod = (action: "next" | "previous") => {
		const changedDate =
			action === "next"
				? addMonths(selectedDate, 1)
				: subMonths(selectedDate, 1);

		setSelectedDate(changedDate);
	};

	useFocusEffect(
		useCallback(() => {
			loadTransactionReport();
		}, [selectedDate])
	);

	return (
		<Atoms.Container>
			<Atoms.Header>
				<Atoms.Title>Resumo por categoria</Atoms.Title>
			</Atoms.Header>

			<Atoms.ReportListContent
				contentContainerStyle={{
					flex: 1,
					paddingHorizontal: 24,
					paddingBottom: useBottomTabBarHeight(),
				}}
			>
				<Atoms.ChartContainer>
					<VictoryPie
						data={formattedReports}
						x="percent"
						y="total"
						colorScale={formattedReports.map((report) => report.color)}
						style={{
							labels: {
								fontSize: theme.utils.RFValue(18),
								fontWeight: "bold",
								fill: theme.colors.shape,
							},
						}}
						labelRadius={50}
					/>
				</Atoms.ChartContainer>

				{formattedReports.map((item) => (
					<Components.HistoryCard
						key={item.name}
						title={item.name}
						amount={item.totalCurrency}
						color={item.color}
					/>
				))}
			</Atoms.ReportListContent>
		</Atoms.Container>
	);
}
