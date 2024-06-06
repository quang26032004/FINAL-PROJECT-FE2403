import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayoutRoot from "./component/common/LayoutRoot.jsx";
import LoginForm from "./component/common/LoginForm.jsx";
import RegisterForm from "./component/common/RegisterForm.jsx";
import AuthLayout from "./component/example/AuthLayout.jsx";
import UserApp from "./component/redux/UserList/UserApp.jsx";
import { Provider } from "react-redux";
import store from "./component/store/store.jsx";
import Dashboard from "./component/common/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthLayout>
        <LayoutRoot />
      </AuthLayout>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/user-list",
        element: <UserApp />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/login",
    element: (
      <AuthLayout isPublic>
        <LoginForm />
      </AuthLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
  </Provider>
);
