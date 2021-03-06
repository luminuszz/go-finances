import styled from "styled-components/native";

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
	background-color: ${({ theme }) => theme.colors.primary};

	width: 100%;
	height: ${({ theme }) => theme.utils.RFValue(113)}px;

	align-items: center;
	justify-content: flex-end;
	padding-bottom: 19px;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.shape};
	font-family: ${({ theme }) => theme.fonts.poppins.regular};
	font-size: ${({ theme }) => theme.utils.RFValue(18)}px;
`;

export const ReportListContent = styled.ScrollView``;

export const ChartContainer = styled.View`
	width: 100%;
	align-items: center;
`;
