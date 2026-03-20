import { createBrowserRouter, redirect } from "react-router";
import { Root } from "./Root";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { SettingsMenuScreen } from "./screens/SettingsMenuScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { ApiScreen } from "./screens/ApiScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        loader: () => redirect("/login"),
      },
      { path: "login", Component: LoginScreen },
      { path: "signup", Component: SignUpScreen },
      { path: "home", Component: HomeScreen },
      { path: "detail", Component: DetailScreen },
      { path: "favorites", Component: FavoritesScreen },
      { path: "settings-menu", Component: SettingsMenuScreen },
      { path: "settings", Component: SettingsScreen },
      { path: "notifications", Component: NotificationsScreen },
      { path: "api", Component: ApiScreen },
    ],
  },
]);
