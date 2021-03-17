import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DripsyProvider } from "dripsy";
import { StatusBar } from "expo-status-bar";

import { HackerNewsScreen } from "./screens/HackerNewsScreen";

const theme = {
  colors: {
    text: "#000",
    background: "#fff",
    primary: "tomato",
  },
  space: [10, 12, 14],
};

export default function App() {
  return (
    <SafeAreaProvider>
      <DripsyProvider theme={theme}>
        <StatusBar style="auto" />
        <HackerNewsScreen />
      </DripsyProvider>
    </SafeAreaProvider>
  );
}
