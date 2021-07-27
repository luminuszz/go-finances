import { useQuery } from "react-query";
import { api, useFetch, CallKeys } from "..";

import { Period, Transaction } from "./types";

export const getTransactionResume = async () => {
	const response = await api.get<Transaction[]>("transactions/resume");

	return response.data;
};

export function useTransactionsResume() {
	return useQuery(CallKeys.transactions_resume, getTransactionResume, {
		staleTime: 1000 * 5,
	});
}
