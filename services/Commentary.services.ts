import axios, { AxiosError } from "axios";
import {
  UseMutationResult,
  useMutation,
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "react-query";

type ErrorAttr = AxiosError<{
  code: string;
  error: boolean;
  message: string;
}>;

type Commentary = {
  commentary: string;
  id: string;
  user: {
    nickname: string;
    lastname: string;
  }
};

type CreateCommentary = {
  commentary: string;
  news: string;
  user: string;
};

const useCommentaries = (
  id: string
): UseQueryResult<Commentary[], ErrorAttr> => {
  return useQuery(`commentaries_${id}`, async () => {
    const { data } = await axios.get(`http://localhost:8080/commentary/${id}`);
    return data;
  });
};

const useCreateCommentary = (): UseMutationResult<
  CreateCommentary,
  ErrorAttr,
  CreateCommentary
> => {
  return useMutation(async (commentary: CreateCommentary) => {
    const { data } = await axios.post(
      "http://localhost:8080/commentary",
      commentary
    );

    return data;
  });
};

export { useCommentaries, useCreateCommentary };
