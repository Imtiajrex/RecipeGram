/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TextInput,
	Image,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import { ThemeContext } from "../contexts/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import one from "../assets/1.jpg";
import two from "../assets/2.jpg";
import three from "../assets/3.jpg";
import four from "../assets/4.jpg";
import five from "../assets/5.jpg";
import six from "../assets/6.jpg";
import seven from "../assets/7.jpg";
import eight from "../assets/8.jpg";
import { LinearGradient } from "expo-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";

const data = [
	{
		img: one,
		id: 1,
		title: "Minty Fresh Chocolate",
		time: 10,
		serve: 2,
		steps: 5,
	},
	{ img: two, id: 2, title: "Indian Curry", time: 15, serve: 5, steps: 7 },
	{ img: three, id: 3, title: "Dal Vajha", time: 5, serve: 10, steps: 4 },
	{ img: four, id: 4, title: "Japanese Sushi", time: 17, serve: 5, steps: 6 },
	{ img: five, id: 5, title: "Tomato Carinder", time: 8, serve: 3, steps: 8 },
];
const categories = [
	"All",
	"Indian",
	"Continental",
	"French",
	"Bengali",
	"Italian",
	"Western",
	"Creative",
];
const { width, height } = Dimensions.get("window");
export default function HomeScreen({ navigation }) {
	const theme = useContext(ThemeContext);
	const styles = StyleSheet.create({
		wrapper: {
			justifyContent: "center",
			alignItems: "center",
			padding: 10,
			backgroundColor: theme.background,
		},

		search: {
			justifyContent: "center",
			padding: 7,
			paddingHorizontal: 25,
			width: "85%",
			backgroundColor: theme.default,
			borderRadius: 35,
			marginTop: 15,
		},
		textInput: {
			fontSize: 17,
		},
		searchIcon: {
			position: "absolute",
			top: "35%",
			right: "5%",
		},
		categoryContainer: {
			marginVertical: 15,
			height: 50,
		},
		category: {
			color: theme.primary,
			margin: 10,
			fontWeight: "bold",
		},
		recipeItem: {
			width: width * 0.9,
			height: width,
			position: "relative",
			borderRadius: 20,
			marginBottom: 15,
			overflow: "hidden",
		},
		img: {
			width: "100%",
			height: "100%",
			resizeMode: "cover",
			position: "absolute",
			top: 0,
		},
		gradient: {
			width: "100%",
			height: "100%",
			position: "absolute",
			top: 0,
		},
		recipeInfo: {
			width: "100%",
			height: "35%",
			position: "absolute",
			bottom: 10,
			padding: 10,
			// justifyContent: "space-between",
		},
		recipeName: {
			marginTop: 10,
			marginBottom: 20,
		},
		itemTitle: {
			color: theme.background,
			fontWeight: "bold",
			fontSize: 21,
		},
		receipeDetails: {
			flexDirection: "row",
		},
		receipeDetailsItem: {
			flexDirection: "row",
			marginRight: 15,
			justifyContent: "center",
			alignItems: "center",
		},
		recipeDetailsText: {
			color: theme.secondary,
			fontSize: 17,
			marginLeft: 5,
		},
	});

	return (
		<View style={styles.wrapper}>
			<View style={styles.search}>
				<TextInput style={styles.textInput} placeholder="Search" multiline />
				<Icon
					name="search"
					style={styles.searchIcon}
					size={30}
					color={theme.secondary}
				/>
			</View>
			<FlatList
				data={categories}
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.categoryContainer}
				decelerationRate="fast"
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<View>
						<Text style={styles.category} key={index}>
							{item}
						</Text>
					</View>
				)}
			/>
			<FlatList
				data={data}
				keyExtractor={(_, idx) => idx.toString()}
				contentContainerStyle={{ paddingBottom: 100 }}
				renderItem={({ item, idx }) => (
					<TouchableWithoutFeedback
						onPress={() => {
							navigation.push("Recipe", { item });
						}}
					>
						<View style={styles.recipeItem}>
							<SharedElement
								id={`item.${item.id}.photo`}
								style={{ width: "100%", height: "100%" }}
							>
								<Image
									style={styles.img}
									resizeMode="cover"
									source={item.img}
								/>
							</SharedElement>
							<LinearGradient
								style={styles.gradient}
								locations={[0, 0.5, 0.6, 1]}
								colors={[
									"rgba(0,0,0,0)",
									"rgba(0,0,0,0.1)",
									"rgba(0,0,0,0.3)",
									"rgba(0,0,0,0.8)",
								]}
							/>
							<View style={styles.recipeInfo}>
								<View style={styles.recipeName}>
									<SharedElement id={`item.${item.id}.title`}>
										<Text style={styles.itemTitle}>{item.title}</Text>
									</SharedElement>
								</View>
								<View style={styles.receipeDetails}>
									<View style={styles.receipeDetailsItem}>
										<Icon
											name="timer-outline"
											size={23}
											color={theme.secondary}
										/>
										<Text style={styles.recipeDetailsText}>
											{item.time} mins
										</Text>
									</View>
									<View style={styles.receipeDetailsItem}>
										<Icon
											name="ios-people-outline"
											size={23}
											color={theme.secondary}
										/>
										<Text style={styles.recipeDetailsText}>
											{item.serve} serve
										</Text>
									</View>
									<View style={styles.receipeDetailsItem}>
										<Icon
											name="albums-outline"
											size={23}
											color={theme.secondary}
										/>
										<Text style={styles.recipeDetailsText}>
											{item.steps} steps
										</Text>
									</View>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				)}
				showsVerticalScrollIndicator={false}
				decelerationRate={"normal"}
			/>
		</View>
	);
}
