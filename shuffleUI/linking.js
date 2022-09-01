const config = {
  screens: {
    Home: {
      path: 'home',
    },
    Main: {
      path: 'Main',
    },
  },
};

const linking = {
  prefixes: ['shuffle://app'],
  config,
};

export default linking;
