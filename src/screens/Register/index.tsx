import React, { useCallback, useState } from "react";
import { Modal } from "react-native";

import * as Atoms from "./styles";

import * as Components from "../../components";
import { CategorySelect } from "../CategorySelect";

type CategoryDTO = {
	key: string;
	name: string;
	icon: string;
};

export function Register() {
	const [selectedType, setSelectedType] = useState("");
	const [categoryModelOpen, setCategoryModelOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<CategoryDTO>({
		key: "",
		name: "Selecione",
		icon: "",
	});

	const handlePressTransactionType = (type: "up" | "down") =>
		setSelectedType(type);

	const handleCloseModal = useCallback(
		() => setCategoryModelOpen(false),
		[setCategoryModelOpen]
	);

	const handleChangeCategory = useCallback(
		(category: CategoryDTO) => setSelectedCategory(category),
		[setSelectedCategory]
	);

	const handleOpenModal = () => setCategoryModelOpen(true);

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

					<Components.CategorySelectButton
						icon={selectedCategory.icon}
						title={selectedCategory.name}
						onPress={handleOpenModal}
					/>
				</Atoms.Fields>
				<Components.Button title="Cadastrar" />
			</Atoms.Form>
			<Modal visible={categoryModelOpen}>
				<CategorySelect
					category={selectedCategory}
					closeSelect={handleCloseModal}
					setCategory={handleChangeCategory}
				/>
			</Modal>
		</Atoms.Container>
	);
}
