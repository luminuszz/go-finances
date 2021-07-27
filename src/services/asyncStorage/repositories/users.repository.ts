import { BaseRepository } from "./base.repository";

import { Entity, resolveInstance } from "../utils";

export interface User {
	id: string;
	name: string;
	email: string;
	avatarUrl: string;
	token: string;
}

export type CreateUserDTO = Omit<User, "id">;

export type UpdateUserDTO = Partial<CreateUserDTO>;

@Entity("users")
class UsersRepository extends BaseRepository<User> {
	async findAll() {
		return this.get();
	}

	async getUser() {
		const user = await this.connection.getItem(this.entityName);

		return this.parse(user) as User;
	}

	async saveUser(createUserDto: User): Promise<void> {
		await this.connection.setItem(
			this.entityName,
			this.encode(createUserDto)
		);
	}

	async updateUser(
		userId: string,
		updateUserDTO: UpdateUserDTO
	): Promise<User> {
		const users = await this.findAll();

		const userIndex = users.findIndex((user) => user.id === userId);

		if (!userIndex) throw new Error("User not found");

		const updatedUser = Object.assign(users[userIndex], {
			...updateUserDTO,
		});

		users[userIndex] = updatedUser;

		await this.save(users);

		return updatedUser;
	}

	async deleteUser(id: string) {
		const users = await this.findAll();

		const filteredUsersLists = users.filter((item) => item.id !== id);

		await this.save(filteredUsersLists);
	}
}

export const usersRepository =
	resolveInstance<UsersRepository>(UsersRepository);
