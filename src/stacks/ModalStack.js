import React from "react";
import { View, Text } from "react-native";

export default function ModalStack() {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen name="Recipe" component={RecipeScreen} options={options} />
			<Stack.Screen
				name="Directions"
				component={Directions}
				options={options}
			/>
		</Stack.Navigator>
	);
}
