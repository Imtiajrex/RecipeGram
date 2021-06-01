import Main from "./src/App";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
export default function App() {
	return (
		<SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
			<Main />
		</SafeAreaView>
	);
}
