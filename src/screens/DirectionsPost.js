import React, { useContext, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	ScrollView,
	FlatList,
	TextInput,
	KeyboardAvoidingView,
} from "react-native";

import { ThemeContext } from "../contexts/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";

import CounterInput from "react-native-counter-input";
const { width, height } = Dimensions.get("window");
export default function DirectionsPost({ setDirections }) {
	const theme = useContext(ThemeContext);
	const styles = StyleSheet.create({
		wrapper: {
			width,
			height,
			position: "absolute",
			top: 0,
			left: 0,
			backgroundColor: "rgba(0,0,0,0.5)",
			zIndex: 999,
		},
		modal: {
			borderTopLeftRadius: 20,
			borderTopRightRadius: 20,
			padding: 10,
			position: "absolute",
			backgroundColor: theme.background,
			bottom: 0,
			left: 0,
			width,
			height: height * 0.9,
		},
		view: {
			width: "100%",
			height: "100%",
			position: "relative",
		},
		backButton: {
			position: "absolute",
			top: 10,
			right: 10,
			zIndex: 100,
		},
		titleView: {
			position: "absolute",
			top: 10,
			left: 10,
			zIndex: 100,
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "row",
		},
		title: {
			fontSize: 21,
			fontWeight: "bold",
		},
		add: {
			marginLeft: 10,
			padding: 5,
			backgroundColor: theme.primary,
			borderRadius: 10,
		},
		scroll: {
			// width: "100%",
			// height: "100%",
			paddingBottom: 100,
			alignItems: "center",
		},
		item: {
			width: width * 0.8,
			borderRadius: 20,
			padding: 15,
			elevation: 8,
			backgroundColor: theme.background,
			position: "relative",
			marginTop: 15,
		},
		itemTextView: {
			width: "100%",
			marginBottom: 5,
			borderBottomColor: theme.default,
			borderBottomWidth: 2,
			flexDirection: "row",
			alignItems: "center",
		},
		itemLabel: {
			fontSize: 16,
			color: theme.secondary,
			padding: 10,
			paddingLeft: 0,
		},
		itemText: {
			fontSize: 16,
			padding: 10,
		},
		index: {
			fontSize: 15,
			fontWeight: "700",
		},
	});
	const [ingredientItem, setIngredientItem] = useState([""]);
	const createItem = () => {
		setIngredientItem([...ingredientItem, ""]);
	};
	const deleteItem = (idx) => {
		let itemsInstance = [...ingredientItem];
		console.log(idx);
		itemsInstance.splice(idx, 1);
		setIngredientItem(itemsInstance);
	};
	return (
		<Animatable.View style={styles.wrapper} animation="fadeIn">
			<Animatable.View style={styles.modal} animation="bounceInUp" delay={150}>
				<View style={styles.view}>
					<TouchableOpacity
						onPress={() => setDirections(false)}
						style={styles.backButton}
					>
						<Icon name="close" size={30} />
					</TouchableOpacity>
					<View style={styles.titleView}>
						<Text style={styles.title}>
							Directions ({ingredientItem.length})
						</Text>

						<TouchableOpacity onPress={createItem} style={styles.add}>
							<Icon name="add" size={20} color="white" />
						</TouchableOpacity>
					</View>
					<KeyboardAvoidingView>
						<FlatList
							data={ingredientItem}
							keyExtractor={(item, index) => index.toString()}
							contentContainerStyle={styles.scroll}
							style={{ marginTop: 100 }}
							showsVerticalScrollIndicator={false}
							renderItem={({ item, index }) => (
								<View style={styles.item}>
									<Text style={styles.index}>Step #{index + 1}</Text>
									<TouchableOpacity
										onPress={() => deleteItem(index)}
										style={styles.backButton}
									>
										<Icon name="trash" size={25} color={"#eb1523"} />
									</TouchableOpacity>
									<View style={styles.itemTextView}>
										<TextInput
											placeholder="ex: Extract Strawberry juice"
											style={styles.itemText}
											multiline
										/>
									</View>
								</View>
							)}
						/>
					</KeyboardAvoidingView>
				</View>
			</Animatable.View>
		</Animatable.View>
	);
}
