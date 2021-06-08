import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
	getBottomSpace,
	getStatusBarHeight,
} from "react-native-iphone-x-helper";
export default {
	colors: {
		primary: "#5636D3",

		secondary: "#FF872C",
		secondary_light: "rgba(255, 135, 44, 0.3)",

		success: "#12A454",
		success_light: "rgba(18, 164, 84, 0.5)",

		attention: "#E83F5b",
		attention_light: "rgba(232, 63, 91, 0.5)",

		shape: "#FFFF",
		title: "#363F5F",
		text: "#969CB2",
		textDark: "#000000",
		background: "#F0F2F5",
	},

	fonts: {
		poppins: {
			regular: "Poppins_400Regular",
			medium: "Poppins_500Medium",
			bold: "Poppins_700Bold",
		},
	},

	utils: {
		RFPercentage,
		RFValue,
		getBottomSpace,
		getStatusBarHeight,
	},
};
