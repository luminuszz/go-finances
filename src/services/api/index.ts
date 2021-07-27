import axios from "axios";

import { usersRepository } from "../asyncStorage/repositories/users.repository";

export enum CallKeys {
	transactions_resume = "transactions@:resume",
	transactions_period = "transactions@:period",
}

const getLocalStorageToken = async () => {
	const user = await usersRepository.getUser();

	return user?.token;
};

export const api = axios.create({
	baseURL: "http://192.168.100.3:3333",
	headers: {
		Authorization: `Bearer ${getLocalStorageToken()}`,
	},
});

export async function useFetch<T = any>(url: string) {
	const response = await api.get<T>(url);

	return response;
}
