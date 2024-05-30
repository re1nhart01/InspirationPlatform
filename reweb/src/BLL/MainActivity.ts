import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, UIManager } from 'react-native';
import { goToUserProfileScreenOnBottomButton, StackScreens } from '../Screens/Core/MainNavigationScreen';
import { INavigation } from '../Screens/Core/OverrideNavigation';
import { currentUser } from './CurrentUserProps';
import { Requests } from './Requests';
class MainActivity {
  constructor() {}


  public async syncToken(retryCount: number = 3) {
    try {
      if (retryCount === 0) {
        throw 500;
      }

    } catch (ex) {
      console.warn('syncToken ex', ex);
      return false;
    }
  }

  public onFailedStart = async () => {
    await AsyncStorage.clear();
    INavigation.navigate(StackScreens.SignIn);
  };

  public onStart = async () => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    goToUserProfileScreenOnBottomButton();
    await currentUser.setToken();
    await AsyncStorage.getItem('Access_TOKEN').then(async (token) => {
      if (token !== void 0 && token !== null) {
        INavigation.navigate(StackScreens.Home);
      } else {
        INavigation.navigate(StackScreens.SignIn);
      }
    });
  };
}

export const application = new MainActivity();
