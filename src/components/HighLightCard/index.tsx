import React from "react";

import * as Atoms from "./styles";

interface Props {
	type: "up" | "down" | "total";
	title: string;
	amount: string;
	lastTransaction: string;
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
	lastTransaction,
	title,
}: Props) {
	return (
		<Atoms.Container type={type}>
			<Atoms.Header>
				<Atoms.Title type={type}>{title}</Atoms.Title>
				<Atoms.Icon name={iconOptions[type]} type={type} />
			</Atoms.Header>

			<Atoms.Footer>
				<Atoms.Amount type={type}>{amount}</Atoms.Amount>
				<Atoms.LastTransaction type={type}>
					{lastTransaction}
				</Atoms.LastTransaction>
			</Atoms.Footer>
		</Atoms.Container>
	);
}
