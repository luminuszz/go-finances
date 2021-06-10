import React from "react";

import { RectButtonProps } from "react-native-gesture-handler";

import * as Atoms from "./styles";

type Props = RectButtonProps & {
	title: string;
};

export default function Button({ title, ...props }: Props) {
	return (
		<Atoms.Container {...props}>
			<Atoms.Title>{title}</Atoms.Title>
		</Atoms.Container>
	);
}
