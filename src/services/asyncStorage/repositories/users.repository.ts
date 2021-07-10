import { BaseRepository } from "./base.repository";

import { Entity } from "../utils";

interface User {
	name: string;
	email: string;
	avatarUrl: string;
}

@Entity("user")
export class UsersRepository extends BaseRepository<User> {}
