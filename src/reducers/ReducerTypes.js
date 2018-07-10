// @flow

export type CommonState = {
    authorsLoading: boolean,
    postsLoading: boolean,
}
export type AuthorsState = Array<string>

export type PostsState = {
    posts: Array<Object>,
    favoritePosts: Array<Object>
}
export type AppState = {
    +common: CommonState,
    +authors: AuthorsState,
    +feed: PostsState,
}
export type PrimitiveAction = {
    +type: string;
  };
export type Payload = any
export type PayloadAction = PrimitiveAction & {
    +payload: Payload;
};
export type Action = PayloadAction;
export type GetState = () => AppState;
export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | PrimitiveAction | Array<Action>) => any;
export type ThunkAction = (dispatch: Dispatch, getState: any) => any;
