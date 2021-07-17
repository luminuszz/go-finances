import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Button = styled(RectButton)`
	height: ${({ theme }) => theme.utils.RFValue(56)}px;
	background-color: ${({ theme }) => theme.colors.shape};
	border-radius: 4px;

	flex-direction: row;
	align-items: center;

	margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
	height: 100%;
	justify-content: center;
	align-items: center;
	padding: ${({ theme }) => theme.utils.RFValue(16)}px;
	border-right-width: 1px;
	border-color: ${({ theme }) => theme.colors.background};
`;

export const Text = styled.Text`
	flex: 1;

	text-align: center;
	font-family: ${({ theme }) => theme.fonts.poppins.medium};
	font-size: ${({ theme }) => theme.utils.RFValue(14)}px;
`;
