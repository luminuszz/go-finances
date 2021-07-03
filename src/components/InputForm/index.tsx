import React from "react";

import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import Input from "../Input";
import * as Atoms from "./styles";

type Props = TextInputProps & {
	name: string;
	control: Control<any>;
	error?: string;
};

export default function InputForm({
	name,
	control,
	error,
	...otherProps
}: Props) {
	return (
		<Atoms.Container>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value, onBlur } }) => (
					<Input
						{...otherProps}
						onChangeText={onChange}
						value={value}
						onBlur={onBlur}
					/>
				)}
			/>
			{error && <Atoms.Error>{error}</Atoms.Error>}
		</Atoms.Container>
	);
}
