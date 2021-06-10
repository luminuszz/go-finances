import React from "react";

import * as Atoms from "./styles";

type Props = {};

export default function Profile(props: Props) {
	return (
		<Atoms.Container>
			<Atoms.UserInfo>
				<Atoms.Photo
					source={{
						uri: "https://avatars.githubusercontent.com/u/48535259?v=4",
					}}
				/>
				<Atoms.User>
					<Atoms.UserGreeting>Olá,</Atoms.UserGreeting>
					<Atoms.UserName>Davi</Atoms.UserName>
				</Atoms.User>
			</Atoms.UserInfo>
			<Atoms.Icon name="power" />
		</Atoms.Container>
	);
}
