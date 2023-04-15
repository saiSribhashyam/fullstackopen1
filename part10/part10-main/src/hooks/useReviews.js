import { useQuery } from "@apollo/react-hooks";

import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (id) => {
  const queryVariables = {
    id,
    first: 3,
  };
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REVIEWS,
      variables: {
        ...queryVariables,
        after: data.repository.reviews.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      },
    });
  };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    variables: queryVariables,
    fetchPolicy: "cache-and-network",
  });

  return {
    reviews: data ? data.repository.reviews : undefined,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useReviews;
