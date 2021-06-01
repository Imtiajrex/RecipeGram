import React from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Dimensions,
	ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../contexts/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

const colors = [
	{ bg: "#f50058", color: "white" },
	{ bg: "#f5b801", color: "black" },
	{ bg: "#04a9ce", color: "black" },
	{ bg: "#6438b0", color: "white" },
	{ bg: "#33ffaa", color: "black" },
	{ bg: "#ff7300", color: "white" },
	{ bg: "#060b40", color: "white" },
];
const { width, height } = Dimensions.get("window");
function DirectionScreen({ navigation }) {
	const theme = React.useContext(ThemeContext);
	const styles = StyleSheet.create({
		wrapper: {
			backgroundColor: theme.background,
			flex: 1,
			width,
			height,
			padding: 10,
			justifyContent: "center",
			alignItems: "center",
		},
		backButton: {
			position: "absolute",
			top: 10,
			left: 10,
		},
		card: {
			width: width * 0.9,
			// height: height * 0.8,
			borderRadius: 20,
			backgroundColor: "black",
			padding: 30,
			paddingBottom: 50,
			justifyContent: "center",
			alignItems: "center",
			margin: 10,
			overflow: "hidden",
		},
		txt: {
			color: "white",
			fontSize: 19,
			lineHeight: 40,
			fontWeight: "700",
		},
		title: {
			position: "absolute",
			top: 10,
			left: "50%",
			transform: [{ translateX: -50 }],
		},
	});
	return (
		<View style={styles.wrapper}>
			<View style={styles.backButton}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Icon name="arrow-back-outline" size={30} color="black" />
				</TouchableOpacity>
			</View>
			<View style={styles.title}>
				<SharedElement id={`directions.title`}>
					<Text style={{ fontSize: 25, fontWeight: "bold" }}>Directions</Text>
				</SharedElement>
			</View>
			<Animatable.View animation="bounceIn" delay={250}>
				<FlatList
					data={Array.from(Array(5).keys())}
					keyExtractor={(_, idx) => idx.toString()}
					horizontal
					contentContainerStyle={{
						justifyContent: "center",
						alignItems: "center",
					}}
					decelerationRate={"fast"}
					snapToInterval={width * 0.9 + 20}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => {
						const colorIndex =
							index > colors.length ? index - colors.length : index;
						return (
							<View
								style={{
									...styles.card,
									backgroundColor: colors[colorIndex].bg,
								}}
							>
								<Text
									style={{
										fontWeight: "bold",
										fontSize: 28,
										marginBottom: 5,
										color: colors[colorIndex].color,
									}}
								>
									#{index + 1}
								</Text>
								<ScrollView>
									<Text
										style={{ ...styles.txt, color: colors[colorIndex].color }}
									>
										Heat the oil in a medium pan over a medium heat. Fry the
										onion and garlic for 8-10 mins until soft. Add the chorizo
										and fry for 5 mins more. Tip in the tomatoes and sugar, and
										season. Bring to a simmer, then add the gnocchi and cook for
										8 mins, stirring often, until soft. Heat the grill to high.
									</Text>
								</ScrollView>
							</View>
						);
					}}
				/>
			</Animatable.View>
		</View>
	);
}
DirectionScreen.sharedElements = (route, otherRoutes, showing) => {
	return ["directions.title"];
};
export default DirectionScreen;
