import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { HackerNewsStory } from "../screens/HackerNewsScreen";
import useComponentLayout from "../hooks/useComponentLayout";
import useOnContentSizeChange from "../hooks/useOnContentSizeChange";
import ParallaxContext from "../context/ParallaxContext";

import { NewsItemCard } from "./NewsItemCard";

interface NewsItemsListProps {
  stories: Array<HackerNewsStory> | null;
  isLoading: boolean;
  fetchStories: () => void;
}

// Credit: https://github.com/maximiliankaske/expo-parallax/blob/main/src/components/ParallaxScrollView.tsx
export const NewsItemsList = ({ stories }: NewsItemsListProps) => {
  const { layout, onLayout } = useComponentLayout();
  const { onContentSizeChange } = useOnContentSizeChange();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <ParallaxContext.Provider
      value={{
        scrollY,
        scrollLayout: layout,
      }}
    >
      <Animated.ScrollView
        onScroll={scrollHandler}
        onLayout={onLayout}
        onContentSizeChange={onContentSizeChange}
        scrollEventThrottle={16}
        contentContainerStyle={{
          margin: 24,
          paddingBottom: 50,
        }}
        style={{ backgroundColor: "#fff" }}
      >
        {stories
          ? stories.map((story) => (
              <NewsItemCard
                numComments={story.numComments}
                key={story.url}
                heading={story.heading}
                url={story.url}
                commentsUrl={story.commentsUrl}
                points={story.points}
              />
            ))
          : null}
      </Animated.ScrollView>
    </ParallaxContext.Provider>
  );
};
