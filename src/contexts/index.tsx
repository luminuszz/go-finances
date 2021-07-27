import React from "react";
import FlashMessageContainer from "react-native-flash-message";
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "react-query";

import { AuthProvider } from "./AutContext";

import theme from "../global/styles/theme";

const queryClient = new QueryClient();

export const AppProvider: React.FC = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<NavigationContainer>
					<AuthProvider>{children}</AuthProvider>
				</NavigationContainer>

				<FlashMessageContainer
					style={{
						marginTop: 10,
						marginHorizontal: 8,
					}}
				/>
			</ThemeProvider>
		</QueryClientProvider>
	);
};
