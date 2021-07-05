import React from "react";
import {
	showMessage as flashMessageShowMessage,
	hideMessage,
	FlashMessageProps,
} from "react-native-flash-message";

type Args = Omit<FlashMessageProps, "message" | "type">;

export function useMessage(config?: Args) {
	const showMessage = React.useCallback(
		(message: string, type: FlashMessageProps["type"] = "default") =>
			flashMessageShowMessage({
				...config,
				message,
				type,
			}),
		[config, flashMessageShowMessage]
	);

	return {
		showMessage,
		hideMessage,
	};
}
