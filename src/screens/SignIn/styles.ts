import styled from "styled-components/native";

export const Container = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	width: 100%;
	height: 70%;

	background-color: ${({ theme }) => theme.colors.primary};

	justify-content: flex-end;
	align-items: center;
`;

export const TitleWrapper = styled.View`
	align-items: center;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.poppins.medium};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${({ theme }) => theme.utils.RFValue(30)}px;
	text-align: center;

	margin-top: 45px;
`;

export const SigInTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.poppins.regular};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${({ theme }) => theme.utils.RFValue(16)}px;
	text-align: center;

	margin-top: 80px;
	margin-bottom: 67px;
`;

export const Footer = styled.View`
	width: 100%;
	height: 70%;

	background-color: ${({ theme }) => theme.colors.secondary};
`;
