/*
import {KeycloakEventType, KeycloakService} from 'keycloak-angular';
import {environment} from '../../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        keycloak.keycloakEvents$.subscribe(event => {
          if (event.type === KeycloakEventType.OnAuthLogout) {
            sessionStorage.clear();
            localStorage.clear();
          }
        });
        await keycloak.init({
          config: environment.keycloak,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false,
          },
          enableBearerInterceptor: environment.enableBearerInterceptor,
          bearerExcludedUrls: [],
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
}

*/
