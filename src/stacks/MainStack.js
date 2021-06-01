import React from "react";
import TabStack from "./TabStack";
import RecipeScreen from "../screens/RecipeScreen";
import HomeScreen from "../screens/HomeScreen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import { Easing } from "react-native-reanimated";
import { enableScreens } from "react-native-screens";
import DirectionScreen from "../screens/DirectionScreen";
import {PostScreen} from "../screens/PostScreen";
enableScreens();
const Stack = createSharedElementStackNavigator();
const forFade = ({ current, closing }) => ({
	cardStyle: {
		opacity: current.progress,
	},
});
const options = {
	animationTypeForReplace: "pop",
	gestureEnabled: false,
	headerBackTitleVisible: false,
	transitionSpec: {
		open: {
			animation: "timing",
			config: { duration: 250, easing: Easing.inOut(Easing.ease) },
		},
		close: {
			animation: "timing",
			config: { duration: 250, easing: Easing.inOut(Easing.ease) },
		},
	},
	cardStyleInterpolator: forFade,
};

export default function MainStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator headerMode="none" initialRouteName="Tab">
				<Stack.Screen name="Tab" component={TabStack} options={options} />
				<Stack.Screen
					name="Recipe"
					component={RecipeScreen}
					options={options}
				/>
				<Stack.Screen
					name="Directions"
					component={DirectionScreen}
					options={options}
				/>
				<Stack.Screen
					name="PostModal"
					component={PostScreen}
					options={options}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
