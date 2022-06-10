type LoadingState = {
  effects: {
    [k: string]: boolean;
  };
};

export type StateType = {
  loading: LoadingState;
};

export default StateType;