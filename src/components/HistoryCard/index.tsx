import React from "react";

import * as Atoms from "./styles";

interface Props {
	title: string;
	amount: string;
	color: string;
}

export default function HistoryCard({ amount, color, title }: Props) {
	return (
		<Atoms.Container color={color}>
			<Atoms.Title>{title}</Atoms.Title>
			<Atoms.Amount>{amount}</Atoms.Amount>
		</Atoms.Container>
	);
}
