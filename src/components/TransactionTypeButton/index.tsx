import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import * as Atoms from "./styles";

const icons = {
	up: "arrow-up-circle",
	down: "arrow-down-circle",
};

type Props = RectButtonProps & {
	title: string;
	type: "up" | "down";
	isActive: boolean;
};

export default function TransactionTypeButton({
	title,
	type,
	isActive,
	...props
}: Props) {
	return (
		<Atoms.Container {...props} type={type} isActive={isActive}>
			<Atoms.Icon type={type} name={icons[type]} />
			<Atoms.Title>{title}</Atoms.Title>
		</Atoms.Container>
	);
}
