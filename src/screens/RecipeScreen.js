import React, { useContext, useState } from "react";

import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SharedElement } from "react-navigation-shared-element";
import { ThemeContext } from "../contexts/Theme";
import * as Animatable from "react-native-animatable";
function RecipeScreen({ navigation, route }) {
	const { item } = route.params;
	const theme = useContext(ThemeContext);
	const styles = StyleSheet.create({
		wrapper: {
			backgroundColor: theme.background,
			flex: 1,
			padding: 10,
		},
		backButton: {
			position: "absolute",
			top: 10,
			left: 10,
			zIndex: 100,
		},
		receipeInfoContainer: {
			width: "100%",
			height: 300,
			alignItems: "center",
			justifyContent: "center",
		},
		img: {
			width: 210,
			height: 250,
			resizeMode: "cover",
			borderRadius: 20,
		},
		functions: {
			position: "absolute",
			top: 0,
			right: "5%",
			width: 45,
			alignItems: "center",
			justifyContent: "center",
			height: "100%",
		},
		function: {
			marginBottom: 10,
			flexDirection: "row",
			justifyContent: "space-between",
			width: 70,
			alignItems: "center",
		},
		upvote: { color: "#35A97F", flex: 1, marginRight: 5 },
		favorite: { color: "#FF557E", flex: 1, marginRight: 5 },
		downvote: { color: "#FA3939", flex: 1, marginRight: 5 },
		title: {
			fontSize: 23,
			fontWeight: "bold",
			textAlign: "center",
			color: theme.primary,
		},
		recipeInfo: {
			margin: 10,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.primary,
			width: 70,
			height: 85,
			borderRadius: 50,
			overflow: "hidden",
		},
		infoText: {
			color: theme.secondary,
			fontSize: 14,
		},
		infoTitle: {
			fontSize: 19,
			fontWeight: "700",
			color: "black",
		},
		directionsBtn: {
			marginTop: 15,
			width: "70%",
			paddingVertical: 10,
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			backgroundColor: "#21c6db",
			borderRadius: 30,
			padding: 20,
		},
	});
	return (
		<View style={styles.wrapper}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={styles.backButton}
			>
				<Icon name="arrow-back-outline" size={30} />
			</TouchableOpacity>
			<View style={styles.receipeInfoContainer}>
				<SharedElement
					id={`item.${item.id}.photo`}
					style={styles.receipeInfoContainer}
				>
					<Image source={item.img} style={styles.img} />
				</SharedElement>

				<Animatable.View style={styles.functions} animation={"fadeInRight"}>
					<TouchableOpacity onPress={() => {}} style={{ ...styles.function }}>
						<Icon name="chevron-up-outline" size={25} style={styles.upvote} />
						<Text style={styles.upvote}>750</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {}} style={{ ...styles.function }}>
						<Icon name="ios-heart-outline" size={25} style={styles.favorite} />
						<Text style={styles.favorite}>205</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {}} style={{ ...styles.function }}>
						<Icon
							name="chevron-down-outline"
							size={25}
							style={styles.downvote}
						/>
						<Text style={styles.downvote}>1</Text>
					</TouchableOpacity>
				</Animatable.View>
			</View>
			<View style={styles.recipeDetail}>
				<View style={{ width: "100%", justifyContent: "center" }}>
					<SharedElement id={`item.${item.id}.title`}>
						<Text style={styles.title}>{item.title}</Text>
					</SharedElement>
				</View>
				<Animatable.View
					animation="fadeInUp"
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					<View style={styles.recipeInfo}>
						<Icon name="timer-outline" size={20} color={theme.secondary} />
						<Text style={styles.infoText}>{item.time} mins</Text>
					</View>
					<View style={styles.recipeInfo}>
						<Icon name="ios-people-outline" size={20} color={theme.secondary} />
						<Text style={styles.infoText}>{item.serve} serve</Text>
					</View>
					<View style={styles.recipeInfo}>
						<Icon name="albums-outline" size={20} color={theme.secondary} />
						<Text style={styles.infoText}>{item.steps} steps</Text>
					</View>
				</Animatable.View>
				<Animatable.View animation="bounceIn" delay={250}>
					<Text style={styles.infoTitle}>Ingredients</Text>
					<FlatList
						contentContainerStyle={{ paddingVertical: 10 }}
						data={["Strawberry", "Onion", "Salt", "Wheat"]}
						keyExtractor={(item, index) => index.toString()}
						horizontal
						showsHorizontalScrollIndicator={false}
						renderItem={({ item, index }) => <Item data={item} />}
					/>
				</Animatable.View>
				<Animatable.View
					delay={300}
					animation="bounceInUp"
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						style={styles.directionsBtn}
						onPress={() => navigation.push("Directions")}
					>
						<SharedElement id="directions.title">
							<Text style={{ fontSize: 25, fontWeight: "bold" }}>
								Directions
							</Text>
						</SharedElement>
						<Icon name="ios-arrow-forward" size={30} />
					</TouchableOpacity>
				</Animatable.View>
			</View>
		</View>
	);
}
const Item = ({ data }) => {
	const styles = StyleSheet.create({
		wrapper: {
			paddingHorizontal: 20,
			paddingVertical: 10,
			justifyContent: "center",
			alignItems: "center",
			borderRadius: 20,
			backgroundColor: "white",
			elevation: 9,
			margin: 10,
		},
		txt: {
			fontSize: 15,
		},
	});
	return (
		<View style={styles.wrapper}>
			<Text style={styles.txt}>{data}</Text>
		</View>
	);
};
RecipeScreen.sharedElements = (route, otherRoutes, showing) => {
	const { item } = route.params;
	if (showing)
		return [
			{
				id: `item.${item.id}.photo`,
				animation: "move",
				resize: "auto",
			},
			{
				id: `item.${item.id}.title`,
				animation: "fade",
				resize: "auto",
			},
		];
};
export default RecipeScreen;
