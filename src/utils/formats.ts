import * as Localization from "expo-localization";
import * as dateLocales from "date-fns/locale";
import { format } from "date-fns";

type KeyofDateLocale = keyof typeof dateLocales;

export const currentLocale = Localization.locale;

console.log(currentLocale);

export const formatDate = (date: Date | number) =>
	format(date, "dd 'de' LLLL 'de' y", {
		locale: dateLocales[currentLocale.replace("-", "") as KeyofDateLocale],
	});

export const formatCurrency = (value: number | string) =>
	Intl.NumberFormat(currentLocale, {
		style: "currency",
		currency: Localization.currency || "US",
	}).format(Number(value));

export const getUTCDateFormat = (date: Date | number) =>
	Intl.DateTimeFormat(currentLocale, {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
	}).format(new Date(date));
