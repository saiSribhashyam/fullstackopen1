import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [mutate, payload] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const payload = await mutate({
      variables: { username, password },
    });

    return payload;
  };

  return [signUp, payload];
};

export default useSignUp;
