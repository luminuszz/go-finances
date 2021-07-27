import React, { createContext, useCallback, useContext, useState } from "react";

import { api } from "../services/api";
import { useMessage } from "../hooks/useMessage";
import { usersRepository } from "../services/asyncStorage/repositories/users.repository";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

type User = {
	id: string;
	email: string;
	name: string;
	avatarPath: string;
};

type LoginResponse = User & {
	access_token: string;
};

interface AuthContext {
	sigIn: (email: string, password: string) => Promise<void>;
	user: User | null;
	isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
	const { showMessage } = useMessage();

	const [user, setUser] = useState<User | null>(null);
	const isAuthenticated = !!user;

	const sigIn = useCallback(
		async (email: string, password: string) => {
			try {
				const payload = {
					email,
					password,
				};

				const { data } = await api.post<LoginResponse>(
					"/auth/login",
					payload
				);

				setUser({
					avatarPath: data.avatarPath,
					email: data.email,
					id: data.id,
					name: data.name,
				});

				await usersRepository.saveUser({
					avatarUrl: data.avatarPath,
					email: data.email,
					id: data.id,
					name: data.name,
					token: data.access_token,
				});

				api.defaults.headers[
					"Authorization"
				] = `Bearer ${data.access_token}`;
			} catch (error) {
				showMessage(error.message, "danger");
			}
		},
		[showMessage, setUser, showMessage, usersRepository.saveUser]
	);

	return (
		<AuthContext.Provider value={{ sigIn, user, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) throw new Error("Can use only useAuth inside useContext ");

	return context;
}
