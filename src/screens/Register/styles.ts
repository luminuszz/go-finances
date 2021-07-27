import styled from "styled-components/native";

export const Container = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.primary};
`;

export const SigInTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.poppins.regular};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${({ theme }) => theme.utils.RFValue(20)}px;
	text-align: center;

	margin-top: 80px;
	margin-bottom: 67px;
`;

export const Form = styled.View`
	justify-content: center;
	align-items: center;
	padding: 0 20px;
`;

export const FormControl = styled.View`
	width: 100%;
	margin: 10px 0;
`;
