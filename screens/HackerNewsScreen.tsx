import React from "react";
import { Alert, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NewsItemsList } from "../components/NewsItemsList";

type HackerNewsHit = {
  title: string;
  url: string;
  author: string;
  points: number;
  // eslint-disable-next-line camelcase
  comment_text: string | null;
  // eslint-disable-next-line camelcase
  story_text: string | null;
  _tags: Array<string>;
  // eslint-disable-next-line camelcase
  num_comments: number;
  objectID: string;
};

export type HackerNewsStory = {
  heading: string;
  url: string;
  commentsUrl: string;
  points: number;
  numComments: number;
};

export const HackerNewsScreen = () => {
  const [stories, setStories] = React.useState<Array<HackerNewsStory> | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const safeAreaInsets = useSafeAreaInsets();

  const fetchHNStories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://hn.algolia.com/api/v1/search_by_date?numericFilters=points%3E250"
      );
      const json = await response.json();
      const stories = json.hits.map((hit: HackerNewsHit) => ({
        heading: hit.title,
        url: hit.url,
        commentsUrl: `https://news.ycombinator.com/item?id=${hit.objectID}`,
        points: hit.points,
        numComments: hit.num_comments,
      }));
      setStories(stories);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("An error occurred getting news stories.");
      console.error(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      await fetchHNStories();
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: safeAreaInsets.top,
      }}
    >
      <NewsItemsList
        fetchStories={fetchHNStories}
        isLoading={isLoading}
        stories={stories}
      />
    </View>
  );
};
