import React, { useState, useEffect, useContext } from "react";
import {
	Image,
	View,
	Platform,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../contexts/Theme";
import CounterInput from "react-native-counter-input";
import TouchableScale from "react-native-touchable-scale";
import IngredientPost from "./IngredientPost";
import DirectionsPost from "./DirectionsPost";

const { width, height } = Dimensions.get("window");
export default function PostForTab() {
	return (
		<View>
			<Text>Post</Text>
		</View>
	);
}

function PostScreen({ item, navigation }) {
	const [image, setImage] = useState(null);
	const [ingredients, setIngredients] = useState(false);
	const [directions, setDirections] = useState(false);

	const theme = useContext(ThemeContext);
	const styles = StyleSheet.create({
		wrapper: {
			flex: 1,
			backgroundColor: theme.background,
			alignItems: "center",
			padding: 10,
		},
		title: {
			position: "absolute",
			top: 10,
			left: "46%",
			fontSize: 25,
			fontWeight: "bold",
		},
		backButton: {
			position: "absolute",
			top: 10,
			left: 10,
			zIndex: 100,
		},
		imageChoose: {
			marginTop: 50,
			width: width * 0.6,
			justifyContent: "center",
			alignItems: "center",
			height: width * 0.4,
			backgroundColor: theme.primary,
			borderRadius: 20,
			position: "relative",
		},
		chooseText: {
			color: "white",
			fontSize: 19,
		},
		image: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
			position: "absolute",
			top: 0,
			left: 0,
			zIndex: -100,
		},
		overlay: {
			width: "100%",
			height: "100%",
			position: "absolute",
			top: 0,
			left: 0,
			zIndex: -10,
		},
		recipeInfo: {
			marginTop: 10,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			width: "90%",
			borderBottomColor: theme.default,
			borderBottomWidth: 3,
			paddingBottom: 15,
		},
		recipeInfoText: {
			fontSize: 18,
		},
		recipeInfoBtn: {
			marginTop: 10,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			width: "100%",
			paddingBottom: 0,
			borderBottomWidth: 0,
		},
		postBtn: {
			width: width * 0.8,
			paddingVertical: 10,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#31f586",
			borderRadius: 20,
		},
		postText: {
			fontSize: 20,
			fontWeight: "bold",
		},
	});

	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!");
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: false,
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};
	return (
		<View style={styles.wrapper}>
			<Text style={styles.title}>Post</Text>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={styles.backButton}
			>
				<Icon name="arrow-back-outline" size={30} />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.imageChoose}
				onPress={pickImage}
				activeScale={0.7}
			>
				{image && (
					<>
						{" "}
						<Image source={{ uri: image }} style={styles.image} />
						<View style={styles.overlay} />
					</>
				)}
				<Text style={styles.chooseText}>Choose Dish Image</Text>
			</TouchableOpacity>
			<View style={styles.recipeInfo}>
				<Text style={styles.recipeInfoText}>Time</Text>
				<CounterInput
					onChange={(counter) => {}}
					increaseButtonBackgroundColor={theme.primary}
					decreaseButtonBackgroundColor={theme.primary}
					horizontal
				/>
				<Text style={styles.recipeInfoText}>minutes</Text>
			</View>
			<View style={styles.recipeInfo}>
				<Text style={styles.recipeInfoText}>Serve</Text>
				<CounterInput
					onChange={(counter) => {}}
					increaseButtonBackgroundColor={theme.primary}
					decreaseButtonBackgroundColor={theme.primary}
					horizontal
				/>
				<Text style={styles.recipeInfoText}>people</Text>
			</View>
			<View style={styles.recipeInfo}>
				<Text style={styles.recipeInfoText}>Directions</Text>
				<CounterInput
					onChange={(counter) => {}}
					increaseButtonBackgroundColor={theme.primary}
					decreaseButtonBackgroundColor={theme.primary}
					horizontal
				/>
				<Text style={styles.recipeInfoText}>steps</Text>
			</View>
			<View style={{ ...styles.recipeInfo }}>
				<TouchableOpacity
					style={styles.recipeInfoBtn}
					onPress={() => {
						setIngredients(true);
					}}
				>
					<Text style={{ ...styles.recipeInfoText }}>Ingredients</Text>
					<Icon name="arrow-forward-outline" size={28} />
				</TouchableOpacity>
			</View>
			<View style={{ ...styles.recipeInfo }}>
				<TouchableOpacity
					style={styles.recipeInfoBtn}
					onPress={() => {
						setDirections(true);
					}}
				>
					<Text style={{ ...styles.recipeInfoText }}>Directions</Text>
					<Icon name="arrow-forward-outline" size={28} />
				</TouchableOpacity>
			</View>
			<TouchableScale activeScale={0.8} style={styles.postBtn}>
				<Text style={styles.postText}>Submit</Text>
			</TouchableScale>
			{ingredients && <IngredientPost setIngredients={setIngredients} />}
			{directions && <DirectionsPost setDirections={setDirections} />}
		</View>
	);
}
export { PostScreen };
