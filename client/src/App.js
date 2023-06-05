import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom'

// import layout
import MainLayout from './layout/MainLayout'
import PostLayout from './layout/PostLayout'
import HomeLayout from './layout/HomeLayout'
// import pages
import HomePage, { homeLoader } from './page/HomePage'
import About from './page/AboutPage'
import LikedPage, {  postsLoader } from './page/LikedPage'
import NewPost, { newAction } from "./page/NewPost";
//login page
import LoginPage from "./page/LoginPage";
import RegisterPage, { action as registerAction } from "./page/RegisterPage";
import RegisterSwitchPage from "./page/RegisterSwitchPage";


// import component
import NotFound from "./component/NotFound";
import ErrorPage from "./component/ErrorPage";
import UnauthorizeError from "./component/UnauthorizeError";

// import utils
import { AuthProvider } from "./utils/AuthProvider";


import Post from './page/Post'
function RouterApp() {

  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<NotFound />}>
        <Route path="home" element={<HomeLayout />}>
          <Route
            index
            element={<HomePage />}
            loader={homeLoader}
            errorElement={<ErrorPage />}
          />

          <Route index element={<Post />} />
          {/* <Route path=":id/new" element={<NewPost />} action={newAction} /> */}
        </Route>
        <Route path="posts" element={<PostLayout />}>
          <Route
            index
            element={<LikedPage />}
            loader={postsLoader}
            errorElement={<ErrorPage />}
          />

          <Route index element={<Post />} />
          {/* <Route path=":id/new" element={<NewPost />} action={newAction} /> */}
        </Route>
        
        <Route path="new" element={<NewPost />} action={newAction} />

        <Route element={<RegisterSwitchPage />}>
          <Route path="register" element={<RegisterPage />} action={registerAction} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="unauthorize" element={<UnauthorizeError />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
        
    )
  );
   return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  );
}