const linking = {
  enabled: true,
  prefixes: ['speckleformilk://'],
  config: {
    screens: {
      UnAuthStack: {
        path: 'UnAuthStack/',
        screens: {
          Login: 'Login',
          RecoveryPassword: 'Recovery',
        },
      },
      Root: {
        path: 'Root/',
        screens: {
          App: {
            path: 'App/',
            screens: {
              DrawerNavigator: {
                path: 'DrawerNavigator/',
                screens: {
                  TopTabNavigator: {
                    path: 'TopTabNavigator/',
                    initialRouteName: 'History/',
                    screens: {
                      NewNavigator: 'NewNavigator/',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
export default linking;
