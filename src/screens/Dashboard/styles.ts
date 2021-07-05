import styled from "styled-components/native";

import { FlatList } from "react-native";

import { TransactionData } from "../../components/TransactionCard";

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
	width: 100%;
	height: ${({ theme }) => theme.utils.RFPercentage(42)}px;

	background-color: ${({ theme }) => theme.colors.primary};

	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
`;

const scrollViewInitialStyles = {
	horizontal: true,
	showsHorizontalScrollIndicator: false,
	contentContainerStyle: {
		paddingHorizontal: 24,
	},
};

export const CardList = styled.ScrollView.attrs(scrollViewInitialStyles)`
	width: 100%;
	position: absolute;
	margin-top: ${({ theme }) => theme.utils.RFPercentage(20)}px;
`;

export const Transactions = styled.View`
	flex: 1;

	padding: 0 24px;
	margin-top: ${({ theme }) => theme.utils.RFPercentage(12)}px;
`;

export const Title = styled.Text`
	font-size: ${({ theme }) => theme.utils.RFValue(18)}px;
	font-family: ${({ theme }) => theme.fonts.poppins.regular};

	margin-bottom: 16px;
`;

export const LoadingTitle = styled.Text`
	font-size: ${({ theme }) => theme.utils.RFValue(18)}px;
`;

export const TransactionList = styled(
	FlatList as new () => FlatList<TransactionData>
).attrs(({ theme }) => ({
	showsHorizontalScrollIndicator: false,
	contentContainerStyle: {
		paddingBottom: theme.utils.getBottomSpace(),
	},
}))``;
