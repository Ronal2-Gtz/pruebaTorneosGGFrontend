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

type News = {
  title: string;
  content: string;
  img: string;
  user: string;
  id?: string;
};

const useNews = (id?: string | null): UseQueryResult<News, ErrorAttr> => {
  return useQuery(
    `news_${id}`,
    async () => {
      const { data } = await axios.get(`http://localhost:8080/news/${id}`);
      return data;
    },
    {
      enabled: !!id,
    }
  );
};

const useListNews = (): UseQueryResult<News[], ErrorAttr> => {
  return useQuery("news", async () => {
    const { data } = await axios.get("http://localhost:8080/news");
    return data;
  });
};

const useCreateNews = (): UseMutationResult<News, ErrorAttr, News> => {
  const queryClient = useQueryClient();
  return useMutation(
    async (news: News) => {
      const { data } = await axios.post("http://localhost:8080/news", news);

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("news");
      },
    }
  );
};

const useUpdateNews = (): UseMutationResult<News, ErrorAttr, News> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (news: News) => {
      const { id, ...otherNews } = news;
      const { data } = await axios.put(
        `http://localhost:8080/news/${id}`,
        otherNews
      );

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("news");
      },
    }
  );
};

const useDeleteNews = (): UseMutationResult<unknown, ErrorAttr, string> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      const { data } = await axios.delete(`http://localhost:8080/news/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("news");
      },
    }
  );
};

export { useListNews, useCreateNews, useNews, useUpdateNews, useDeleteNews };
