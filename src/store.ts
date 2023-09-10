import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signin/slice";
import tokenReducer from "./token/slice";
import userReducer from "./account/slice";

export const store = configureStore({
    reducer: {
        signin: signinReducer,
        token: tokenReducer,
        user: userReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
