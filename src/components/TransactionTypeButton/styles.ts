import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { opacify } from "polished";

type IconsProps = {
	type: "up" | "down";
};

type SelectedProps = {
	isActive?: boolean;
	type: "up" | "down";
};

export const Container = styled(RectButton)<SelectedProps>`
	width: 48%;

	flex-direction: row;
	align-items: center;

	border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
	border-style: solid;
	border-color: ${({ theme }) => theme.colors.text};
	border-radius: 5px;

	padding: 16px;

	justify-content: center;

	${({ isActive, theme, type }) =>
		isActive &&
		type === "up" &&
		css`
			background-color: ${opacify(0.001, theme.colors.success_light)};
		`};

	${({ isActive, theme, type }) =>
		isActive &&
		type === "down" &&
		css`
			background-color: ${opacify(0.001, theme.colors.attention_light)}};
		`};
`;

export const Icon = styled(Feather)<IconsProps>`
	font-size: ${({ theme }) => theme.utils.RFValue(24)}px;
	margin-right: 12px;

	color: ${({ theme, type }) =>
		type === "up" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
	font-size: ${({ theme }) => theme.utils.RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.poppins.regular};
`;
