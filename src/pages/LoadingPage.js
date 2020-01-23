import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingPage = () => {
  return (
    <Dimmer active>
      <Loader>Signing in...</Loader>
    </Dimmer>
  );
};

export default LoadingPage;
