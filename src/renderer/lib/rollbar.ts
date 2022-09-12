import rollbarAccessToken from './rollbarAccessToken';

// eslint-disable-next-line no-console
console.log('rollbarAccessToken: ', rollbarAccessToken);

export const rollbarConfig = {
  accessToken: rollbarAccessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: { environment: process.env.NODE_ENV || 'development' },
  autoInstrument: {
    network: true,
    networkResponseHeaders: true,
    // networkResponseBody: true,
    networkRequestBody: true,
    log: true,
    dom: true,
    navigation: true,
    connectivity: true,
    contentSecurityPolicy: true,
    errorOnContentSecurityPolicy: true,
  },
};
