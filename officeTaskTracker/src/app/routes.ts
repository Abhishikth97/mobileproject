import { createBrowserRouter, redirect } from 'react-router';
import { MobileLayout } from './components/MobileLayout';
import { LoginScreen } from './screens/LoginScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TaskDetailScreen } from './screens/TaskDetailScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsMenuScreen } from './screens/SettingsMenuScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ApiIntegrationScreen } from './screens/ApiIntegrationScreen';

export const router = createBrowserRouter([
  {
    index: true,
    loader: () => redirect('/login'),
  },
  {
    path: '/login',
    Component: LoginScreen,
  },
  {
    path: '/signup',
    Component: SignUpScreen,
  },
  {
    Component: MobileLayout,
    children: [
      {
        path: '/home',
        Component: HomeScreen,
      },
      {
        path: '/task/:id',
        Component: TaskDetailScreen,
      },
      {
        path: '/profile',
        Component: ProfileScreen,
      },
      {
        path: '/settings',
        Component: SettingsMenuScreen,
      },
      {
        path: '/settings/preferences',
        Component: SettingsScreen,
      },
      {
        path: '/notifications',
        Component: NotificationsScreen,
      },
      {
        path: '/api',
        Component: ApiIntegrationScreen,
      },
    ],
  },
]);
