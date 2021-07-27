import React from "react";

import { useAuth } from "../contexts/AutContext";
import { AppRoutes } from "./app.routes";
import { PublicRoutes } from "./public.routes";

export function Routes() {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <AppRoutes /> : <PublicRoutes />;
}
