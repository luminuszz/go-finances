import styled from "styled-components/native";

import { TextInput } from "react-native";

export const Container = styled(TextInput)`
	width: 100%;
	padding: 16px 18px;

	font-size: ${({ theme }) => theme.utils.RFValue(14)}px;
	color: ${({ theme }) => theme.colors.textDark};

	background-color: ${({ theme }) => theme.colors.shape};

	border-radius: 5px;
	margin-bottom: 8px;
`;
