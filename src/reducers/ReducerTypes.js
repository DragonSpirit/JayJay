// @flow

export type ResponsePost = {
  anum: number,
  can_comment: number,
  ditemid: number,
  event: string,
  event_timestamp: number,
  eventtime: string,
  itemid: number,
  logtime: string,
  props: {
    give_features: number,
    interface: string,
    langs: string,
    og_image: ?string,
    personifi_tags: string,
    taglist: string,
  },
  reply_count: number,
  subject: string,
  url: string,
}

export type Post = {
  author: string,
  id: number,
  did: number,
  title: string,
  text: string,
  ts: number,
  url: string,
  img: ?string,
  tags: string,
  isFavorite: boolean,
}

export type CommonState = {
    +authorsLoading: boolean,
    +postsLoading: boolean,
}
export type AuthorsState = Array<string>

export type PostsState = {
    +posts: Array<Post>,
    +favoritePosts: Array<Post>
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
