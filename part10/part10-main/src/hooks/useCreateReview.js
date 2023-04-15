import { useMutation } from "@apollo/react-hooks";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, payload] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const payload = await mutate({
      variables: { repositoryName, ownerName, rating, text },
    });

    return payload;
  };

  return [createReview, payload];
};

export default useCreateReview;
