import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/const";
import {
  UseMutationResult,
  useMutation,
  UseQueryResult,
  useQuery,
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
  };
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
    const { data } = await axios.get(`${BASE_URL}/commentary/${id}`);
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
      `${BASE_URL}/commentary`,
      commentary
    );

    return data;
  });
};

export { useCommentaries, useCreateCommentary };
