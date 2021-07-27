import React from "react";
import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import {
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
	useFonts,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "react-native";
import AppLoading from "expo-app-loading";

import { AppProvider } from "./src/contexts";
import { Routes } from "./src/routes";

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
		<AppProvider>
			<StatusBar barStyle="light-content" />
			<Routes />
		</AppProvider>
	);
}
