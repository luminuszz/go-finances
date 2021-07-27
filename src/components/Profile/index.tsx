import React from "react";
import { useAuth } from "../../contexts/AutContext";

import * as Atoms from "./styles";

type Props = {};

export default function Profile(props: Props) {
	const { user } = useAuth();

	console.log("user", user);

	const formattedAvatarUrl = user?.avatarPath.replace(
		"localhost",
		"192.168.100.3"
	);

	console.log(formattedAvatarUrl);

	return (
		<Atoms.Container>
			<Atoms.UserInfo>
				<Atoms.Photo
					source={{
						uri:
							formattedAvatarUrl ||
							"https://avatars.githubusercontent.com/u/48535259?v=4",
					}}
				/>
				<Atoms.User>
					<Atoms.UserGreeting>Olá,</Atoms.UserGreeting>
					<Atoms.UserName>{user?.name}</Atoms.UserName>
				</Atoms.User>
			</Atoms.UserInfo>
			<Atoms.IconButton>
				<Atoms.Icon name="power" />
			</Atoms.IconButton>
		</Atoms.Container>
	);
}
