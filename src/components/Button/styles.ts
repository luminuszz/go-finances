import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.secondary};

	border-radius: 5px;
	padding: 18px;

	align-items: center;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.poppins.medium};
	font-size: ${({ theme }) => theme.utils.RFValue(14)}px;
	color: ${({ theme }) => theme.colors.shape};
`;
