import React from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { transactionRepository } from "../../services/asyncStorage/repositories/transaction.repository";
import { useMessage } from "../../hooks/useMessage";
import { CategorySelect } from "../CategorySelect";
import * as Components from "../../components";

import * as Atoms from "./styles";
type CategoryDTO = {
	key: string;
	name: string;
	icon: string;
};

type FormPayload = {
	name: string;
	price: number;
	selectedType: "up" | "down";
	selectedCategory: CategoryDTO;
};

const schema = yup.object().shape({
	name: yup.string().required(),
	price: yup
		.number()
		.typeError("Informe um valor numérico")
		.positive()
		.required(),
	selectedType: yup.string().required(),
	selectedCategory: yup.object({
		key: yup.string(),
		name: yup.string().required(),
		icon: yup.string(),
	}),
});

export function Register() {
	const [categoryModelOpen, setCategoryModelOpen] = React.useState(false);
	const { showMessage } = useMessage();
	const { navigate } = useNavigation();

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
		reset,
	} = useForm<FormPayload>({
		resolver: yupResolver(schema),
		reValidateMode: "onChange",
		defaultValues: {
			selectedCategory: {
				icon: "",
				key: "",
				name: "Selecione",
			},
		},
	});

	const handleCloseModal = React.useCallback(
		() => setCategoryModelOpen(false),
		[setCategoryModelOpen]
	);

	const handleOpenModal = () => setCategoryModelOpen(true);

	const sendNewTransaction = async (formPayload: FormPayload) => {
		try {
			await transactionRepository.saveTransaction(formPayload);

			showMessage("Transação salva com sucesso !", "success");
			reset();
			navigate("Listagem");
		} catch (error) {
			console.error(error);

			showMessage("Não possível salvar a transação", "danger");
		}
	};

	const [watchTransactionTypeType, watchSelectedCategory] = watch([
		"selectedType",
		"selectedCategory",
	]);

	React.useEffect(() => {
		(async () => {
			const data = await transactionRepository.getTransactions();

			console.log(data);
		})();
	}, []);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Atoms.Container>
				<Atoms.Header>
					<Atoms.Title>Cadastro</Atoms.Title>
				</Atoms.Header>

				<Atoms.Form>
					<Atoms.Fields>
						<Components.InputForm
							control={control}
							name="name"
							placeholder="Nome"
							autoCapitalize="sentences"
							autoCorrect={false}
							error={errors.name?.message}
						/>
						<Components.InputForm
							name="price"
							control={control}
							placeholder="Preço"
							autoCapitalize="none"
							keyboardType="numeric"
							error={errors.price?.message}
						/>
						<Atoms.TransactionsTypes>
							<Components.TransactionTypeButton
								onPress={() => setValue("selectedType", "up")}
								isActive={watchTransactionTypeType === "up"}
								title="Entrada"
								type="up"
							/>
							<Components.TransactionTypeButton
								onPress={() => setValue("selectedType", "down")}
								isActive={watchTransactionTypeType === "down"}
								title="Saída"
								type="down"
							/>
						</Atoms.TransactionsTypes>

						<Components.CategorySelectButton
							icon={watchSelectedCategory?.icon}
							title={watchSelectedCategory?.name}
							onPress={handleOpenModal}
						/>
					</Atoms.Fields>
					<Components.Button
						title="Cadastrar"
						onPress={handleSubmit(sendNewTransaction)}
					/>
				</Atoms.Form>
				<Modal visible={categoryModelOpen}>
					<CategorySelect
						category={watchSelectedCategory}
						closeSelect={handleCloseModal}
						setCategory={(category: CategoryDTO) =>
							setValue("selectedCategory", category)
						}
					/>
				</Modal>
			</Atoms.Container>
		</TouchableWithoutFeedback>
	);
}
