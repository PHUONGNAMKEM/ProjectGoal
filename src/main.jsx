import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import BookPage from './pages/book.jsx';
import UserPage from './pages/user.jsx';
import "./styles/global.css"
import TodoApp from './components/todo/TodoApp.jsx';
import ErrorPage from './pages/error.jsx';
import SettingPage from './pages/setting.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import PrivateRoute from './pages/private.route.jsx';
import BodyPage from './components/layout/bodypage.jsx';
import GoalPage from './pages/goal.jsx';
import TaskPage from './pages/task.jsx';

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


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </React.StrictMode>,
)
