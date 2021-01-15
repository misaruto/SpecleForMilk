export type UnAuthStackParamList = {
  Login: Object;
  Register: Object;
  RecoveryPassword: Object;
  SeeOffers: Object;
};

export type RootStackParamList = {
  Root: Object;
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

export interface IMetaInfo {
  estado: string;
  cidade: string;
  uf: string;
}
export interface IUser {
  name: string;
  email: string;
  metaInfo: IMetaInfo | string;
  profileImage: string;
}
export interface ILoginData extends FormData {
  login: string;
  password: string;
}

export interface ILogoutResponse {
  ok: boolean;
}
