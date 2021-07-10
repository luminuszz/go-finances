import styled from "styled-components/native";

interface ContainerStyleProps {
	color: string;
}

export const Container = styled.View<ContainerStyleProps>`
	width: 100%;

	background-color: ${({ theme }) => theme.colors.shape};

	flex-direction: row;
	justify-content: space-between;

	padding: 13px 24px;

	border-radius: 5px;
	border-left-width: 7px;
	border-left-color: ${({ color }) => color};

	margin-bottom: 8px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.poppins.regular};
	font-size: ${({ theme }) => theme.utils.RFValue(15)}px;
`;

export const Amount = styled.Text`
	font-family: ${({ theme }) => theme.fonts.poppins.bold};
	font-size: ${({ theme }) => theme.utils.RFValue(15)}px;
`;
