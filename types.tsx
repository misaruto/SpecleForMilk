export type RootStackParamList = {
  Root: Object;
  Login: Object;
  NotFound: Object;
};

export type TopTabParamList = {
  Home: Object;
  History: Object;
  NewNavigator: Object;
  Settings: Object;
};

export type HomeParamList = {
  Home: Object;
};

export type HistoryParamList = {
  History: Object;
};

export type NewNavigatorParamList = {
  NewRead: Object;
  ReadNew: Object;
};

export type SettingsParamList = {
  Settings: Object;
};

export interface IUser {
  name: string;
  email: string;
  metaInfo: Object;
}
export interface ILoginData extends FormData {
  login: string;
  password: string;
}
