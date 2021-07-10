import React from "react";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";
import { useTheme } from "styled-components";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
	const theme = useTheme();

	return (
		<Navigator
			initialRouteName="Cadastrar"
			tabBarOptions={{
				activeTintColor: theme.colors.secondary,
				inactiveTintColor: theme.colors.text,
				labelPosition: "beside-icon",
				style: {
					paddingVertical: Platform.OS === "ios" ? 20 : 0,
					height: 88,
				},
			}}
		>
			<Screen
				component={Dashboard}
				name="Listagem"
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons
							size={size}
							color={color}
							name="format-list-bulleted"
						/>
					),
				}}
			/>
			<Screen
				component={Register}
				name="Cadastrar"
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons
							size={size}
							color={color}
							name="attach-money"
						/>
					),
				}}
			/>
			<Screen
				component={Resume}
				name="Resumo"
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons size={size} color={color} name="pie-chart" />
					),
				}}
			/>
		</Navigator>
	);
}
