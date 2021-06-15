import React from "react";

import { categories } from "../../utils/categories";

import * as Components from "../../components";
import * as Atoms from "./styles";

export type CategoryDTO = {
	key: string;
	name: string;
	icon: string;
};

type Props = {
	category: CategoryDTO;
	setCategory: (category: CategoryDTO) => void;
	closeSelect: () => void;
};

export function CategorySelect({ category, setCategory, closeSelect }: Props) {
	const handleSelectCategory = (item: CategoryDTO) => setCategory(item);

	return (
		<Atoms.Container>
			<Atoms.Header>
				<Atoms.Title>Categoria</Atoms.Title>
			</Atoms.Header>

			<Atoms.CategoryList
				data={categories}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<Atoms.Category
						onPress={() => handleSelectCategory(item)}
						isActive={category.key === item.key}
					>
						<Atoms.Icon name={item.icon} />
						<Atoms.Name>{item.name}</Atoms.Name>
					</Atoms.Category>
				)}
				ItemSeparatorComponent={() => <Atoms.Separator />}
			/>

			<Atoms.Footer>
				<Components.Button title="Selecionar" onPress={closeSelect} />
			</Atoms.Footer>
		</Atoms.Container>
	);
}
