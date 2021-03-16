import { createContext } from "react";
import Animated from "react-native-reanimated";

interface ParallaxContextProps {
  scrollY: Animated.SharedValue<number> | undefined;
  scrollLayout: {
    width: number;
    height: number;
  };
}

const ParallaxContext = createContext<ParallaxContextProps>({
  scrollY: undefined,
  scrollLayout: {
    width: 0,
    height: 0,
  },
});

export default ParallaxContext;
