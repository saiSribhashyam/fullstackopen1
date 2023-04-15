import ApolloClient from "apollo-boost";
import Constants from "expo-constants";

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    uri: Constants.manifest.extra.apolloUri,
  });
};

export default createApolloClient;
