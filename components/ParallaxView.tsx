import { default as React, ReactNode } from "react";
import { ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import useComponentLayout from "../hooks/useComponentLayout";
import useParallax from "../hooks/useParallax";

interface ParallaxViewProps extends ViewProps {
  children: ReactNode;
}

export interface ParallaxViewConfigProps {
  onlyOnce: boolean;
  transition: {
    scale: number;
    translateY: number;
    rotate: number;
    opacity: number;
  };
  initial: {
    scale: number;
    translateY: number;
    rotate: number;
    opacity: number;
  };
  scroll: {
    translateY: number;
  };
}

const defaultConfig: ParallaxViewConfigProps = {
  onlyOnce: false,
  transition: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    translateY: 0,
  },
  initial: {
    scale: 0.5,
    rotate: -1,
    opacity: 0,
    translateY: 0,
  },
  scroll: { translateY: 0 },
};

const IN_VIEW_THRESHOLD = 50;

const ParallaxView = ({ children, style, ...props }: ParallaxViewProps) => {
  const { layout, onLayout } = useComponentLayout();
  const wasInView = useSharedValue<boolean>(false);
  const { scrollY, scrollLayout } = useParallax();

  const inView = useDerivedValue(() => {
    const currentlyInView =
      scrollY!.value + IN_VIEW_THRESHOLD <= layout.y + layout.height &&
      scrollLayout.height + scrollY!.value >= layout.y + IN_VIEW_THRESHOLD;

    if (!wasInView.value && currentlyInView) {
      (wasInView.value as boolean) = true;
    }

    return currentlyInView;
  });

  const shouldBeActive = useDerivedValue(() => {
    if (inView.value) {
      return inView.value;
    } else {
      return wasInView.value;
    }
  });

  const opacity = useDerivedValue(() => {
    return withSpring(
      shouldBeActive.value
        ? defaultConfig.transition.opacity
        : defaultConfig.initial.opacity
    );
  });

  const scale = useDerivedValue(() => {
    return withSpring(
      shouldBeActive.value
        ? defaultConfig.transition.scale
        : defaultConfig.initial.scale
    );
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      onLayout={onLayout}
      style={[style, animatedStyle]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

export default ParallaxView;
