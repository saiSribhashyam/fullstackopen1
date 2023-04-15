import { useMutation } from "@apollo/react-hooks";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, payload] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    console.log("id at delete review", id);
    const payload = await mutate({
      variables: { id },
    });

    return payload;
  };

  return [deleteReview, payload];
};

export default useDeleteReview;
