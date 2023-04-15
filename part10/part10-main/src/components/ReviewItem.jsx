import React from "react";
import { format } from "date-fns";
import { View, StyleSheet } from "react-native";
import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderTopColor: theme.colors.mainBackground,
    borderTopWidth: 10,
  },
  topContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  ratingContainer: {
    flexGrow: 0,
    marginRight: 20,
    width: 40,
    height: 40,
    borderStyle: "solid",
    borderRadius: 20,
    borderColor: "blue",
    // color: "blue",
    borderWidth: 2,
    alignItems: "center",
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View key={review.node.id} style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.ratingContainer}>
          <Text fontWeight='bold' style={{ marginTop: 9, color: "blue" }}>
            {review.node.rating}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight='bold'
            fontSize='subheading'
            numberOfLines={1}
          >
            {review.node.user.username}
          </Text>
          <Text
            testID='repositoryDescription'
            style={styles.descriptionText}
            color='textSecondary'
          >
            {format(new Date(review.node.createdAt), "dd.MM.yyyy")}
          </Text>
          <Text style={{ marginTop: 5 }}>{review.node.text}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}></View>
    </View>
  );
};

export default ReviewItem;
