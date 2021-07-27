import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { InputForm, Button } from "../../components";
import { useAuth } from "../../contexts/AutContext";
import { useMessage } from "../../hooks/useMessage";
import * as Atoms from "./styles";

type FormPayload = {
	email: string;
	password: string;
};

const schema = Yup.object().shape({
	email: Yup.string().required(),
	password: Yup.string().required(),
});

export function Register() {
	const [loading, setLoading] = useState(false);
	const { sigIn } = useAuth();
	const { showMessage } = useMessage();

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<FormPayload>({
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(schema),
	});

	const handleLogin = async ({ email, password }: FormPayload) => {
		try {
			setLoading(true);
			await sigIn(email, password);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	return (
		<Atoms.Container>
			<Atoms.SigInTitle>LOGIN</Atoms.SigInTitle>
			<Atoms.Form>
				<Atoms.FormControl>
					<InputForm
						control={control}
						name="email"
						placeholder="E-mail"
						autoCorrect={false}
						autoCompleteType="email"
						keyboardType="email-address"
						textContentType="emailAddress"
						error={errors.email?.message}
					/>
				</Atoms.FormControl>
				<Atoms.FormControl>
					<InputForm
						control={control}
						name="password"
						placeholder="Senha"
						autoCorrect={false}
						secureTextEntry
						autoCapitalize="none"
						error={errors.password?.message}
					/>
				</Atoms.FormControl>

				<Atoms.FormControl>
					<Button
						enabled={!loading}
						title={loading ? "Enviando..." : "Entrar"}
						onPress={handleSubmit(handleLogin)}
					/>
				</Atoms.FormControl>
			</Atoms.Form>
		</Atoms.Container>
	);
}
