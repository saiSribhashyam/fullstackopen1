import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Route,
  Switch,
  Redirect,
  useParams,
  NativeRouter as Router,
} from "react-router-native";

import useRepository from "../hooks/useRepository";
import useReviews from "../hooks/useReviews";

import RepositoryList from "./RepositoryList";
import RepositoryItem from "./RepositoryItem";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import CreateReview from "./CreateReview";
import MyReviews from "./MyReviews";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const SingleRepository = () => {
  let { id } = useParams();

  if (id === "sign-in") {
    return <SignIn />;
  } else if (id === "sign-up") {
    return <SignUp />;
  } else {
    const { repository } = useRepository(id);
    const { reviews, fetchMore } = useReviews(id);

    const onEndReach = () => {
      fetchMore();
    };

    if (!repository) {
      return null;
    }

    return (
      <View style={{ paddingBottom: 14, backgroundColor: "white" }}>
        <RepositoryItem
          key={repository.id}
          repository={repository}
          reviews={reviews}
          onEndReach={onEndReach}
        />
      </View>
    );
  }
};

const Main = () => {
  return (
    <View style={styles.container}>
      <Router>
        <AppBar />
        <Switch>
          <Route path='/' exact>
            <RepositoryList />
          </Route>
          <Route path='/create-review' exact>
            <CreateReview />
          </Route>
          <Route path='/my-reviews' exact>
            <MyReviews />
          </Route>

          <Route path='/:id'>
            <SingleRepository />
          </Route>

          <Route path='/sign-in' exact>
            <SignIn />
          </Route>
          <Redirect to='/' />

          <Route path='/sign-up' exact>
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </View>
  );
};

export default Main;
