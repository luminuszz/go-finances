import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import * as Atoms from "./styles";

interface Props extends RectButtonProps {
	title: string;
	onPress: () => void;
}

export default function Button({ title, ...props }: Props) {
	return (
		<Atoms.Container {...props}>
			<Atoms.Title>{title}</Atoms.Title>
		</Atoms.Container>
	);
}
