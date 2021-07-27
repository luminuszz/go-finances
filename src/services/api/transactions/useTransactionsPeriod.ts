import { useQuery } from "react-query";
import { api, useFetch, CallKeys } from "..";

import { Period, Transaction } from "./types";

export const getTransactionsPeriod = async ({ mouth, year }: Period) => {
	const { data } = await api.get<Transaction[]>(
		`transactions/period/${mouth}/${year}`
	);

	return data;
};

export function useTransactionsPeriod({ mouth, year }: Period) {
	return useQuery(
		CallKeys.transactions_period,
		() => getTransactionsPeriod({ mouth, year }),
		{
			staleTime: 1000 * 5,
		}
	);
}
