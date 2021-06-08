import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

type TypeProps = {
	type: "up" | "down" | "total";
};

export const Container = styled.View<TypeProps>`
	background-color: ${({ theme, type }) =>
		type === "total" ? theme.colors.secondary : theme.colors.shape};

	width: ${({ theme }) => theme.utils.RFValue(300)}px;
	border-radius: 5px;

	padding: 19px 23px;
	padding-bottom: ${({ theme }) => theme.utils.RFValue(42)}px;

	margin-right: 16px;
`;

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
	font-family: ${({ theme }) => theme.fonts.poppins.regular};
	font-size: ${({ theme }) => theme.utils.RFValue(14)}px;

	color: ${({ theme, type }) =>
		type === "total" ? theme.colors.shape : theme.colors.textDark};
`;

export const Icon = styled(Feather)<TypeProps>`
	font-size: ${({ theme }) => theme.utils.RFValue(40)}px;

	${({ type }) =>
		type === "up" &&
		css`
			color: ${({ theme }) => theme.colors.success};
		`}

	${({ type }) =>
		type === "down" &&
		css`
			color: ${({ theme }) => theme.colors.attention};
		`}

	${({ type }) =>
		type === "total" &&
		css`
			color: ${({ theme }) => theme.colors.shape};
		`}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
	font-family: ${({ theme }) => theme.fonts.poppins.medium};
	font-size: ${({ theme }) => theme.utils.RFValue(32)}px;

	color: ${({ theme, type }) =>
		type === "total" ? theme.colors.shape : theme.colors.textDark};

	margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
	font-family: ${({ theme }) => theme.fonts.poppins.regular};
	font-size: ${({ theme }) => theme.utils.RFValue(12)}px;

	color: ${({ theme, type }) =>
		type === "total" ? theme.colors.shape : theme.colors.text};
`;
