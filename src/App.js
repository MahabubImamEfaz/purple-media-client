import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layouts/Main";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import Media from "./Pages/Media/Media";
import Details from "./Pages/Media/Details";
import About from "./Pages/About/About";
import UpdatedMessage from "./Pages/Media/UpdatedMessage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signin",
          element: <SignUp></SignUp>,
        },
        {
          path: "/media",
          element: <Media></Media>,
        },
        {
          path: "/about",
          element: <About></About>,
        },
        {
          path: "/updated",
          element: <UpdatedMessage></UpdatedMessage>,
        },
        {
          path: "/details/:id",
          element: <Details></Details>,
          loader: ({ params }) =>
            fetch(`http://localhost:5000/details/${params.id}`),
        },
        // {
        //   path: "/about/:id",
        //   element: <About></About>,
        //   loader: ({ params }) =>
        //     fetch(`http://localhost:5000/about/${params.id}`),
        // },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
