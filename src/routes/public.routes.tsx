import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Register } from "../screens/Register";
import { SigIn } from "../screens/SignIn";

const { Navigator, Screen } = createStackNavigator();

export function PublicRoutes() {
	return (
		<Navigator headerMode="none" initialRouteName="Login">
			<Screen component={Register} name="Register" />
			<Screen component={SigIn} name="Login" />
		</Navigator>
	);
}
