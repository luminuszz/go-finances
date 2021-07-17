import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

interface Props extends RectButtonProps {
	title: string;
	svg: React.FC<SvgProps>;
}

import * as Atoms from "./styles";

export default function SigInSocialButton({
	svg: Svg,
	title,
	...props
}: Props) {
	return (
		<Atoms.Button {...props}>
			<Atoms.ImageContainer>
				<Svg />
			</Atoms.ImageContainer>
			<Atoms.Text>{title}</Atoms.Text>
		</Atoms.Button>
	);
}
