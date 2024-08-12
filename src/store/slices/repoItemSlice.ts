import { createSlice } from "@reduxjs/toolkit";
import { ICurrentItem } from "../../types";

// Создание интерфейса для инициализации, который включает в себя интерфейс конкретного элемента
interface RepoState {
  item: ICurrentItem;
}

// Инициализиционные значения
const initialState: RepoState = {
  item: {
    name: "",
    description: "",
    license: {
      key: "",
      name: "",
      spdx_id: "",
      url: "",
      node_id: "",
    },
    stars: 0,
    topics: [],
  },
};

export const repoCurrentSlice = createSlice({
  name: "search-current",
  initialState,
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setItem } = repoCurrentSlice.actions;

export default repoCurrentSlice.reducer;
