import url from "url";

import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import TouchableScale from "@jonny/touchable-scale";

import ParallaxView from "./ParallaxView";

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
  return (
    <ParallaxView>
      <TouchableScale
        onPress={async () => {
          // navigation.navigate("StoryScreen", {
          //   commentsUrl,
          //   url,
          // });
        }}
        key={`key-${heading}-${url}`}
        style={styles.container}
      >
        <Text style={styles.headerText}>{heading}</Text>
        {url && <Text style={styles.smallText}>{urlShortener(url)}</Text>}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text style={styles.smallText}>{points}</Text>
            <View
              style={{
                paddingBottom: 4,
                marginLeft: 4,
              }}
            >
              <Feather name={"arrow-up"} size={20} />
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
            <Text style={styles.smallText}>{numComments}</Text>
            <View
              style={{
                paddingBottom: 4,
                marginLeft: 4,
              }}
            >
              <Feather name={"message-circle"} size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableScale>
    </ParallaxView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
  smallText: {
    fontSize: 16,
    marginBottom: 6,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
});
