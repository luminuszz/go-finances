import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
	background-color: ${({ theme }) => theme.colors.shape};

	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	border-radius: 5px;
	padding: 18px 16px;
`;

export const Category = styled.View`
	flex-direction: row;
	align-items: flex-start;
`;

export const CategoryName = styled.Text`
	font-family: ${({ theme }) => theme.fonts.poppins.regular};
	font-size: ${({ theme }) => theme.utils.RFValue(14)}px;

	margin-left: 5px;
`;

export const CategoryIcon = styled(Feather)`
	font-size: ${({ theme }) => theme.utils.RFValue(20)}px;
`;

export const Icon = styled(Feather)`
	font-size: ${({ theme }) => theme.utils.RFValue(20)}px;
`;
