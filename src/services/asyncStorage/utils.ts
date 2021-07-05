import { AsyncStorageStatic } from "react-native";

export interface Connection {
	getItem(name: string): Promise<any>;
	setItem(...data: any[]): Promise<void>;
	removeItem(entityName: string): Promise<void>;
}

enum Entities {
	transactions = "@goFinances:transactions",
}

export type EntityKey = keyof typeof Entities;

export function SetConnection(connection: Connection) {
	return function <T extends { new (...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			connection = connection;
		};
	};
}

export function Entity(entityName: EntityKey) {
	return function <T extends { new (...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			entityName = Entities[entityName];
		};
	};
}

export function Parse() {
	return (_: any, __: string, description: PropertyDescriptor) => {
		const originalMethod = description.value as Function;

		description.value = async function (...args: any) {
			const response = await originalMethod.apply(this, ...args);

			return typeof response === "string" ? JSON.parse(response) : response;
		};

		return description;
	};
}

export function resolveInstance<Instance>(Class: any): Instance {
	const instance = new Class();

	return instance;
}
