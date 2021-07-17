import React from "react";
import FlashMessageContainer from "react-native-flash-message";
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./AutContext";

import theme from "../global/styles/theme";

export const AppProvider: React.FC = ({ children }) => (
	<ThemeProvider theme={theme}>
		<NavigationContainer>
			<AuthProvider>{children}</AuthProvider>
		</NavigationContainer>

		<FlashMessageContainer
			style={{
				marginTop: 38,
			}}
		/>
	</ThemeProvider>
);
