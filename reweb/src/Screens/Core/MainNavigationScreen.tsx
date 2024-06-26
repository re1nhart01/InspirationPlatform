import React, { useEffect } from 'react';
import { NavigationContainer, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInComponent from '../SignInComponent';
import { Component } from '../../Types/Types';
import { AppState, BackHandler } from 'react-native';
import SetupAccountComponent from '../SetupAccountComponent';
import MyProfileComponent from '../MyProfileComponent';
import AddComponent from '../AddComponent';
import NotificationsComponent from '../NotificationsComponent';
import BottomNavigation from '../segments/BottomNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashComponent from './SplashComponent';
import EditProfileComponent from '../EditProfileComponent';
import SettingsComponent from '../SettingsComponent';
import MenuContainer from '../Controllers/MenuContainer';
import ExpandedPostContainer from '../Controllers/ExpandedPostContainer';
import UserProfileContainer from '../Controllers/UserProfileContainer';
import RequestListContainer from '../Controllers/RequestListContainer';
import HomeContainer from '../Controllers/HomeContainer';
import U2UChatContainer from '../Controllers/U2UChatContainer';
import ManageAccountContainer from '../Controllers/ManageAccountContainer';
import { INavigation } from './OverrideNavigation';
import FollowingListContainer from '../Controllers/FollowingListContainer';
import { CommentListContainer } from '../Controllers/CommentListContainer';
import RegisterComponent from '../RegisterComponent';
import { NotificationContainer } from '../Controllers/NotificationContainer';
import {AboutUserComponent} from "../AboutUserComponent";

interface IProps {}

export enum StackScreens {
  Splash = 'SplashComponent',
  SignIn = 'SignInComponent',
  SignUp = 'SignUpComponent',
  SetupAccount = 'SetupAccountComponent',
  MyProfile = 'MyProfileComponent',
  UserProfile = 'UserProfileComponent',
  Home = 'HomeComponent',
  Menu = 'MenuComponent',
  Add = 'AddComponent',
  Notifications = 'NotificationsComponent',
  Settings = 'SettingsComponent',
  EditProfile = 'EditProfileComponent',
  PostDetails = 'ExpandedPostComponent',
  RequestList = 'RequestListComponent',
  U2UChat = 'UserToUserChatComponent',
  Manage = 'ManageAccountComponent',
  Following = 'FollowingListComponent',
  Comments = 'CommentListComponent',
  AboutUser = 'AboutUserComponent',
}

export const noGoBack = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      INavigation.goBack();
      return true;
    });
  });
};

export function onFocus(callback: Function, deps: Array<any> = []) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useFocusEffect(
      // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useCallback(() => {
      callback();
    }, [INavigation.navigationStack, ...deps])
  );
}

export function onBlur(callback: Function, deps: Array<any> = []) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useFocusEffect(
      // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useCallback(() => {
      return () => callback();
    }, [INavigation.navigationStack, ...deps])
  );
}

export const goBack = (navProps: NavigationProp<any>) => {
  navProps.goBack();
};

export const goToUserProfileScreenOnBottomButton = () => {
  BackHandler.addEventListener('hardwareBackPress', () => {
    INavigation.goBack();
    return true;
  });
};

const MainNavigationScreen: React.FC = (props: IProps) => {
  const Tab = createBottomTabNavigator();
  let defaultScreen = StackScreens.SignIn;
  const withoutNavigation = [StackScreens.SignIn, StackScreens.SignUp, StackScreens.SetupAccount];
  const withoutNavigationIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const Screens: { name: string; component: Component; options?: any }[] = [
    // Service screens
    { name: StackScreens.Splash, component: SplashComponent, options: { headerShown: false } },
    { name: StackScreens.SignIn, component: SignInComponent, options: { headerShown: false } },
    { name: StackScreens.SignUp, component: RegisterComponent, options: { headerShown: false } },
    { name: StackScreens.SetupAccount, component: SetupAccountComponent, options: { headerShown: false } },
    { name: StackScreens.EditProfile, component: EditProfileComponent, options: { headerShown: false } },
    { name: StackScreens.Settings, component: SettingsComponent, options: { headerShown: false } },
    { name: StackScreens.Manage, component: ManageAccountContainer, options: { headerShown: false } },
    { name: StackScreens.Following, component: FollowingListContainer, options: { headerShown: false } },
    { name: StackScreens.Comments, component: CommentListContainer, options: { headerShown: false } },
    { name: StackScreens.AboutUser, component: AboutUserComponent, options: { headerShown: false } },
    //Main screens
    { name: StackScreens.U2UChat, component: U2UChatContainer, options: { headerShown: false } },
    { name: StackScreens.PostDetails, component: ExpandedPostContainer, options: { headerShown: false } },
    { name: StackScreens.RequestList, component: RequestListContainer, options: { headerShown: false } },
    { name: StackScreens.UserProfile, component: UserProfileContainer, options: { headerShown: false } },
    { name: StackScreens.MyProfile, component: MyProfileComponent, options: { headerShown: false } },
    { name: StackScreens.Home, component: HomeContainer, options: { headerShown: false } },
    { name: StackScreens.Menu, component: MenuContainer, options: { headerShown: false } },
    { name: StackScreens.Add, component: AddComponent, options: { headerShown: false } },
    { name: StackScreens.Notifications, component: NotificationContainer, options: { headerShown: false } },
  ];

  useEffect(() => {
    ApplicationState();
  }, [AppState]);

  const ApplicationState = () => {
    const subscription = AppState.addEventListener('change', (state) => {
      switch (state) {
        case 'active':
          console.log('app active');
          break;
        case 'background':
          console.log('app background');
          break;
        case 'inactive':
          console.log('app inactive');
          break;
        case 'unknown':
          console.log('app unknown');
          break;
        case 'extension':
          console.log('app extension');
          break;
      }
    });
    return () => {
      subscription.remove();
    };
  };
  console.log(localStorage.getItem("Access_TOKEN"), localStorage.getItem("Access_TOKEN") ? defaultScreen : StackScreens.Home)
  return (
    <NavigationContainer ref={INavigation.navigation}>
      <Tab.Navigator
        initialRouteName={localStorage.getItem("Access_TOKEN") ? StackScreens.Home : defaultScreen}
        tabBar={({ navigation }) => {
          const index = navigation.getState().index;
          if (!withoutNavigationIndex.includes(index)) {
            return <BottomNavigation />;
          } else {
            return null;
          }
        }}
      >
        {Screens.map((el) => {
          return <Tab.Screen key={el.name} name={el.name} component={el.component} options={el.options} />;
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigationScreen;
