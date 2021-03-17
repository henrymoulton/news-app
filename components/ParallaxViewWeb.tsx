import { View } from "dripsy";
import { default as React, ReactNode } from "react";
import { ViewProps } from "react-native";
import Animated from "react-native-reanimated";

interface ParallaxViewWebProps extends ViewProps {
  children: ReactNode;
}

const ParallaxViewWeb = ({
  children,
  style,
  ...props
}: ParallaxViewWebProps) => {
  return (
    <View
      // Some weird typing issue.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      as={Animated.View}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
};

export default ParallaxViewWeb;
