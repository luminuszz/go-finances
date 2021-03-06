import React from "react";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "styled-components";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import { SignInSocialButton } from "../../components";

import * as Atoms from "./styles";

export function SigIn() {
	const { navigate } = useNavigation();
	const { utils } = useTheme();

	return (
		<Atoms.Container>
			<Atoms.Header>
				<Atoms.TitleWrapper>
					<LogoSvg width={utils.RFValue(120)} height={utils.RFValue(68)} />
					<Atoms.Title>
						Controle suas {"\n"}
						finanças de forma {"\n"}
						muito simples
					</Atoms.Title>
				</Atoms.TitleWrapper>

				<Atoms.SigInTitle>
					Faça seu login com {"\n"}
					umas das contas abaixo
				</Atoms.SigInTitle>
			</Atoms.Header>

			<Atoms.Footer>
				<Atoms.FooterWrapper>
					<SignInSocialButton
						title="Entrar com o Google"
						svg={GoogleSvg}
					/>
					<SignInSocialButton title="Entrar com a Apple" svg={AppleSvg} />

					<SignInSocialButton
						onPress={() => navigate("Register")}
						title="Entrar com a go finances"
						svg={AppleSvg}
					/>
				</Atoms.FooterWrapper>
			</Atoms.Footer>
		</Atoms.Container>
	);
}
