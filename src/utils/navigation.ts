import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';

// Create a navigation ref that can be used outside of the React component tree
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Type-safe navigation function
export const navigate = (name: string, params?: RootStackParamList[]) => {
  if (navigationRef.isReady()) {
    //@ts-ignore
    navigationRef.navigate(name, params);
  } else {
    // Optional: Handle the case when navigator is not ready
    console.warn('Navigation attempted before navigator was ready');
  }
};

// Type-safe replace function
export const replace = <T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  } else {
    console.warn('Navigation attempted before navigator was ready');
  }
};

// Type-safe goBack function
export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};

// Get current route name
export const getCurrentRoute = () => {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return null;
};
