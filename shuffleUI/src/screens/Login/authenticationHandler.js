import {authorize, refresh} from 'react-native-app-auth';
import {CLIENT_ID, CLIENT_SECRET} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUrl: 'shuffle:/app',
      scopes: [
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
  }

  async onLogin() {
    try {
      const result = await authorize(this.spotifyAuthConfig);
      AsyncStorage.setItem('accessToken', result.accessToken);
      return result;
    } catch (error) {}
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    await AsyncStorage.setItem('accessToken', result.accessToken);
    return result;
  }
}

const authHandler = new AuthenticationHandler();

export default authHandler;
