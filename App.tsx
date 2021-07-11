import React from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { ThemeProvider } from "styled-components";
import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessageContainer from "react-native-flash-message";

import theme from "./src/global/styles/theme";

import { AppRoutes } from "./src/routes/app.routes";

export default function App() {
	const [isFontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!isFontsLoaded) {
		return <AppLoading />;
	}

	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<StatusBar barStyle="light-content" />
				<AppRoutes />
			</NavigationContainer>

			<FlashMessageContainer
				style={{
					marginTop: 38,
				}}
			/>
		</ThemeProvider>
	);
}
