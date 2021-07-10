import React from "react";
import { formatCurrency, formatDate } from "../../utils/formats";

import * as Atoms from "./styles";

interface Props {
	type: "up" | "down" | "total";
	title: string;
	amount: string;
	transactionDetails: Date | number | string;
}

type IconRef = Record<Props["type"], string>;

const iconOptions: IconRef = {
	up: "arrow-up-circle",
	down: "arrow-down-circle",
	total: "dollar-sign",
};

export default function HighLightCard({
	type,
	amount,
	transactionDetails,
	title,
}: Props) {
	const formattedAmount = formatCurrency(amount);

	const formattedLastTransaction =
		type !== "total"
			? `Última ${type === "up" ? "entrada" : "sáida"} dia ${formatDate(
					new Date(transactionDetails)
			  )}`
			: transactionDetails;

	return (
		<Atoms.Container type={type}>
			<Atoms.Header>
				<Atoms.Title type={type}>{title}</Atoms.Title>
				<Atoms.Icon name={iconOptions[type]} type={type} />
			</Atoms.Header>

			<Atoms.Footer>
				<Atoms.Amount type={type}>{formattedAmount}</Atoms.Amount>
				<Atoms.LastTransaction type={type}>
					<Atoms.LastTransaction type={type}>
						{formattedLastTransaction}
					</Atoms.LastTransaction>
				</Atoms.LastTransaction>
			</Atoms.Footer>
		</Atoms.Container>
	);
}
