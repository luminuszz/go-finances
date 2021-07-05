import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { Connection, EntityKey, Parse, SetConnection } from "../utils";

@SetConnection(AsyncStorage)
export class BaseRepository<EntityData = any[]> {
	constructor(
		private readonly entityName: EntityKey,
		protected readonly connection: Connection
	) {}

	private encode = (data: any) => JSON.stringify(data);

	protected parseError = (message: string, method?: string) =>
		new Error(`Ocurred Error in method: ${method || ""} : ${message}`);

	protected generateUUID = () => String(uuid.v4());

	protected async save(data: EntityData[]) {
		try {
			this.connection.setItem(this.entityName, this.encode(data));
		} catch (error) {
			this.parseError(error.message, this.save.name);
		}
	}

	@Parse()
	protected async get(): Promise<EntityData[]> {
		const data = await this.connection.getItem(this.entityName);

		return !data ? [] : data;
	}

	protected async clear(): Promise<void> {
		await this.connection.removeItem(this.entityName);
	}
}
