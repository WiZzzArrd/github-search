import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../../types";

// Создание API для взаимодействия с GitHub API, используя Redux Toolkit Query
export const repoApi = createApi({
  // Указание уникального пути для редьюсера, который будет связан с этим API
  reducerPath: "repoApi",
  // Базовый URL для всех запросов к GitHub API
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),

  // Определение эндпоинтов для работы с API
  endpoints: (builder) => ({
    // Эндпоинт для поиска репозиториев на GitHub
    getRepos: builder.query<
      IResponse,
      { q: string; sort: string; order: string; page: number; per_page: number }
    >({
      query: ({ q, sort, order, page, per_page }) => {
        return {
          url: "search/repositories",
          params: {
            q,
            sort,
            order,
            page,
            per_page,
          },
        };
      },
    }),
  }),
});

// Экспорт хуков для выполнения запросов к API в компонентах
export const { useLazyGetReposQuery, useGetReposQuery } = repoApi;
