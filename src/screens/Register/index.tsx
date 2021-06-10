import React, { useState } from "react";

import * as Atoms from "./styles";

import * as Components from "../../components";

export function Register() {
	const [selectedType, setSelectedType] = useState("");

	const handlePressTransactionType = (type: "up" | "down") =>
		setSelectedType(type);

	return (
		<Atoms.Container>
			<Atoms.Header>
				<Atoms.Title>Cadastro</Atoms.Title>
			</Atoms.Header>

			<Atoms.Form>
				<Atoms.Fields>
					<Components.Input placeholder="Nome" />
					<Components.Input placeholder="Preço" />
					<Atoms.TransactionsTypes>
						<Components.TransactionTypeButton
							onPress={() => handlePressTransactionType("up")}
							isActive={selectedType === "up"}
							title="Entrada"
							type="up"
						/>
						<Components.TransactionTypeButton
							onPress={() => handlePressTransactionType("down")}
							isActive={selectedType === "down"}
							title="Saída"
							type="down"
						/>
					</Atoms.TransactionsTypes>
				</Atoms.Fields>
				<Components.Button title="Cadastrar" />
			</Atoms.Form>
		</Atoms.Container>
	);
}
