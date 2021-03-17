import url from "url";

import React from "react";
import { H2, P, View } from "dripsy";
import {
  Linking,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import TouchableScale from "@jonny/touchable-scale";

import ParallaxView from "./ParallaxView";
import ParallaxViewWeb from "./ParallaxViewWeb";

const nodeUrl = url;

const urlShortener = (url: string) => {
  const host = nodeUrl.parse(url).hostname;
  if (host?.startsWith("www.")) {
    return host?.substr(4, host.length);
  }
  return host;
};

interface NewsItemCardProps {
  heading: string;
  url: string;
  commentsUrl: string;
  points: number;
  numComments: number;
}

export const NewsItemCard = ({
  heading,
  url,
  commentsUrl,
  points,
  numComments,
}: NewsItemCardProps) => {
  // const navigation = useNavigation();

  const containerStyle: StyleProp<ViewStyle> = {
    backgroundColor: "#fff",
    padding: 24,
    margin: 16,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 14,
  };

  const PlatformContainerView =
    Platform.OS === "web" ? ParallaxViewWeb : ParallaxView;

  return (
    <PlatformContainerView
      style={{
        width: Platform.select({ ios: "100%", web: "40%" }),
      }}
    >
      <TouchableScale
        onPress={async () => {
          // navigation.navigate("StoryScreen", {
          //   commentsUrl,
          //   url,
          // });
        }}
        key={`key-${heading}-${url}`}
        style={containerStyle}
      >
        <H2>{heading}</H2>
        {url && <P>{urlShortener(url)}</P>}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <P>{points}</P>
            <View
              style={{
                marginLeft: 4,
              }}
            >
              <Feather name={"arrow-up"} size={15} />
            </View>
          </View>
          <TouchableOpacity
            onPress={async () => {
              await Linking.openURL(commentsUrl);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <P>{numComments}</P>
            <View
              style={{
                marginLeft: 4,
              }}
            >
              <Feather name={"message-circle"} size={15} />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableScale>
    </PlatformContainerView>
  );
};
