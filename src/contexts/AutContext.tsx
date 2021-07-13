import React, { createContext, useContext } from "react";

import { usersRepository } from "../services/asyncStorage/repositories/users.repository";

interface AuthContext {
	sigIn: () => void;
}

const AuthContext = createContext({} as AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
	const sigIn = () => {};

	return (
		<AuthContext.Provider value={{ sigIn }}>{children}</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) throw new Error("Can use only useAuth inside useContext ");

	return context;
}
