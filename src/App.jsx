import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Error from "./Error";
import Home from "./pages/Home";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "creators",
        element: <ShowCreators />,
      },
      {
        path: "creators/add",
        element: <AddCreator />,
      },
      {
        path: "creators/:id",
        element: <ViewCreator />,
      },
      {
        path: "creators/:id/edit",
        element: <EditCreator />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
