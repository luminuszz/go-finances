import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as Atoms from "./styles";

type Props = TouchableOpacityProps & {
	title: string;
};

export default function Button({ title, ...props }: Props) {
	return (
		<Atoms.Container {...props}>
			<Atoms.Title>{title}</Atoms.Title>
		</Atoms.Container>
	);
}
