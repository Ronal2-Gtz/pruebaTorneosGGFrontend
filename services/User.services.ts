import { BASE_URL } from "@/utils/const";
import axios, { AxiosError } from "axios";
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from "react-query";

type ErrorAttr = AxiosError<{
  code: string;
  error: boolean;
  message: string;
}>;

type User = {
  name: string;
  lastname: string;
  nickname: string;
  password: string;
  id?: string;
};

const useListUser = (): UseQueryResult<User[], ErrorAttr> => {
    return useQuery("user", async () => {
      const { data } = await axios.get(`${BASE_URL}/user`);
      return data;
    });
  };
  

const useCreateUser = (): UseMutationResult<User, ErrorAttr, User> => {
  const queryClient = useQueryClient();
  return useMutation(
    async (user: User) => {
      const { data } = await axios.post(`${BASE_URL}/user`, user);

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
};

export { useCreateUser, useListUser };
