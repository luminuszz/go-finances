import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import * as Atoms from "./styles";

type Props = RectButtonProps & {
	title: string;
	icon: string;
};

export default function CategorySelectButton({ title, icon, ...props }: Props) {
	return (
		<Atoms.Container {...props} activeOpacity={0.7}>
			<Atoms.Category>
				<Atoms.CategoryIcon name={icon} />
				<Atoms.CategoryName>{title}</Atoms.CategoryName>
			</Atoms.Category>
			<Atoms.Icon name="chevron-down" />
		</Atoms.Container>
	);
}
