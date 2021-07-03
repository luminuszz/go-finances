import { Feather } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";

import styled from "styled-components/native";

export const Container = styled.View`
	width: 100%;

	padding: 0 24px;
	margin-top: ${({ theme }) =>
		getStatusBarHeight() + theme.utils.RFValue(28)}px;

	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const UserInfo = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const User = styled.View`
	margin-left: 17px;
`;

export const Photo = styled.Image`
	width: ${({ theme }) => theme.utils.RFValue(48)}px;
	height: ${({ theme }) => theme.utils.RFValue(48)}px;

	border-radius: 10px;
`;

export const UserGreeting = styled.Text`
	color: ${({ theme }) => theme.colors.shape};

	font-size: ${({ theme }) => theme.utils.RFValue(17)}px;
	font-family: ${({ theme }) => theme.fonts.poppins.regular};
`;

export const UserName = styled.Text`
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${({ theme }) => theme.utils.RFValue(17)}px;
	font-family: ${({ theme }) => theme.fonts.poppins.bold};
`;

export const IconButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
	color: ${({ theme }) => theme.colors.secondary};
	font-size: ${({ theme }) => theme.utils.RFValue(24)}px;
`;
