import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParamsType } from "../../types";

// Типизация инициализиционного значения
const initialState: ParamsType = {
  q: "",
  order: "desc",
  total_count: "",
  sort: "stars",
  per_page: 10,
  page: 1,
  repositories: [],
};

export const repoSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Добавляет массив элементов
    setItems: (state, action) => {
      state.repositories = action.payload;
    },
    // Добавление числа, определяющего количество элементов на странице
    setPerPage: (state, action: PayloadAction<number>) => {
      state.per_page = action.payload;
    },
    // Добавление числа для определения страницы
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    // Добавление строки запросы
    setQuery: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
    },
    //Добавление общего числа элементов, пришедших с сервера
    setTotalCount: (state, action: PayloadAction<string>) => {
      state.total_count = action.payload;
    },
    // Добавление направления сортировки
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    // Добавление типа сортировки
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

// Экспорт всех редьюсеров
export const {
  setItems,
  setPerPage,
  setQuery,
  setTotalCount,
  setPage,
  setOrder,
  setSort,
} = repoSlice.actions;

export default repoSlice.reducer;
