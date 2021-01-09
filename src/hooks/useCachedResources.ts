import React from 'react';

import AuthContext from '../contexts/AuthContext';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const {getLoggedIn} = React.useContext(AuthContext);
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await getLoggedIn();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, [getLoggedIn]);

  return isLoadingComplete;
}
