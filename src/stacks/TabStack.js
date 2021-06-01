import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import UserScreen from "../screens/UserScreen";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { ThemeContext } from "../contexts/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import { BlurView } from "@react-native-community/blur";
const Tab = createBottomTabNavigator();
function MyTabBar({ state, descriptors, navigation }) {
	const theme = useContext(ThemeContext);
	const focusedOptions = descriptors[state.routes[state.index].key].options;

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}
	const styles = StyleSheet.create({
		bar: {
			flexDirection: "row",
			width: "100%",
			backgroundColor: "rgba(255,255,255,0.1)",
			padding: 15,
		},
		menuItem: {
			flex: 1,

			alignItems: "center",
			justifyContent: "center",
		},
	});
	const icons = {
		Home: "ios-home-outline",
		Post: "add-circle-outline",
		Profile: "person-outline",
	};

	return (
		<View style={styles.bar}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						if (route.name == "Post") navigation.navigate("PostModal");
						else navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				return (
					<View style={styles.menuItem} key={index}>
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
						>
							<Icon
								name={icons[label]}
								style={{
									color: isFocused ? theme.primary : theme.secondary,
								}}
								size={26}
							/>
						</TouchableOpacity>
					</View>
				);
			})}
		</View>
	);
}
export default function TabStack({ navigation }) {
	return (
		<Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Post" component={PostScreen} />
			<Tab.Screen name="Profile" component={UserScreen} />
		</Tab.Navigator>
	);
}
