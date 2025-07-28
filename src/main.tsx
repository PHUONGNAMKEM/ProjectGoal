import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login.tsx';
import RegisterPage from './pages/register.tsx';
import BookPage from './pages/book.jsx';
import UserPage from './pages/user.jsx';
import "./styles/global.css"
// import TodoApp from './components/todo/TodoApp.jsx';
import ErrorPage from './pages/error.tsx';
import SettingPage from './pages/setting.tsx';
import { AuthWrapper } from './components/context/auth.context.tsx';
import PrivateRoute from './pages/private.route.tsx';
import BodyPage from './components/layout/bodypage.tsx';
import GoalPage from './pages/goal.tsx';
import TaskPage from './pages/task.tsx';
import GoalDetail from './components/goal/goalDetail/goalDetail.tsx';

import './styles/global.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <BodyPage />,
        children: [
          // {
          //   index: true,
          //   element: <TodoApp />
          // },
          {
            path: "/users",
            element: <UserPage />,
          },
          {
            path: "/api/users",
            element: <UserPage />,
          },
          {
            path: "/books",
            element: (<PrivateRoute>
              <BookPage />
            </PrivateRoute>),
          },
          {
            path: "/settings",
            element: <SettingPage />,
          },
          {
            path: "/goal",
            element: <GoalPage />,
          },
          {
            path: "/goal/:id",
            element: <GoalDetail />,
          },
          {
            path: "/tasks",
            index: true,
            element: <TaskPage />,
          },
        ]
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </React.StrictMode>,
)


