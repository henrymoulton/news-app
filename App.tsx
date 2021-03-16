import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { HackerNewsScreen } from "./screens/HackerNewsScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <HackerNewsScreen />
    </SafeAreaProvider>
  );
}
