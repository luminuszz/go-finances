import styled from "styled-components/native";

import { TextInput } from "react-native";

export const Container = styled.View`
	width: 100%;
`;

export const Error = styled.Text`
	color: ${({ theme }) => theme.colors.attention};
	font-size: ${({ theme }) => theme.utils.RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.poppins.regular};

	margin: 7px 0;
`;
