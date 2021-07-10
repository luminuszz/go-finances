import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Connection, EntityKey, SetConnection } from "../utils";

const { v4 } = uuid;

@SetConnection(AsyncStorage)
export class BaseRepository<EntityData = any[]> {
	constructor(
		private readonly entityName: EntityKey,
		protected readonly connection: Connection
	) {}

	private encode = (data: any) => JSON.stringify(data);

	private parse = (data: string) => JSON.parse(data);

	protected generateUUID = () => String(v4());

	protected parseError = (message: string, method?: string) =>
		new Error(`Ocurred Error in method: ${method || ""} : ${message}`);

	protected async save(data: EntityData[]) {
		try {
			await this.connection.setItem(this.entityName, this.encode(data));
		} catch (error) {
			this.parseError(error.message, this.save.name);
		}
	}

	protected async get(): Promise<EntityData[]> {
		const data = await this.connection.getItem(this.entityName);

		return !data ? [] : this.parse(data);
	}

	protected async clear(): Promise<void> {
		await this.connection.removeItem(this.entityName);
	}
}
