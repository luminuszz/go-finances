import styled from "styled-components/native";

import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { categories } from "../../utils/categories";

type CategoryProps = {
	isActive: boolean;
};

type Categories = typeof categories[0];

export const Container = styled(GestureHandlerRootView)`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
	width: 100%;
	height: ${({ theme }) => theme.utils.RFValue(113)}px;

	background-color: ${({ theme }) => theme.colors.primary};

	align-items: center;
	justify-content: flex-end;

	padding-bottom: 19px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.poppins.medium};
	font-size: ${({ theme }) => theme.utils.RFValue(18)}px;
	color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
	width: 100%;
	padding: ${({ theme }) => theme.utils.RFValue(15)}px;

	background-color: ${({ theme, isActive }) =>
		isActive ? theme.colors.secondary_light : theme.colors.background};

	flex-direction: row;
	align-items: center;
`;

export const Icon = styled(Feather)`
	font-size: ${({ theme }) => theme.utils.RFValue(20)}px;
	margin-right: 16px;
`;

export const Name = styled.Text`
	font-family: ${({ theme }) => theme.fonts.poppins.regular};
	font-size: ${({ theme }) => theme.utils.RFValue(14)}px;
`;

export const Separator = styled.View`
	height: 1px;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.text};
`;

export const CategoryList = styled(
	FlatList as new () => FlatList<Categories>
).attrs({
	flex: 1,
	width: "100%",
})``;

export const Footer = styled.View`
	width: 100%;
	padding: 24px;
`;

export const ButtonText = styled.Text``;
