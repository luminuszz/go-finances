import React from "react";
import { TextInputProps } from "react-native";

import * as Atoms from "./styles";

type Props = TextInputProps & {};

export default function Input({ ...props }: Props) {
	return <Atoms.Container {...props}></Atoms.Container>;
}
