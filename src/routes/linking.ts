const linking = {
  enabled: true,
  prefixes: ['speckleformilk://'],
  config: {
    screens: {
      Root: {
        path: 'Root',
        screens: {
          App: {
            path: 'App',
            screens: {
              DrawerNavigator: {
                path: 'DrawerNavigator',
                screens: {
                  TopTabNavigator: {
                    path: 'TopTabNavigator',
                    initialRouteName: 'History',
                    screens: {
                      NewNavigator: 'NewNavigator',
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
