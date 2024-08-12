import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { repoApi } from "./services/repoApi";
import repoSlice from "./slices/repoSlice";
import repoCurrentSlice from "./slices/repoItemSlice";

const rootReducer = combineReducers({
  repos: repoSlice,
  repo: repoCurrentSlice,
  [repoApi.reducerPath]: repoApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(repoApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
