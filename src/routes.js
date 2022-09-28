import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import VideosPage from "./pages/VideosPage";
import TagsPage from "./pages/TagsPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import UnderConstruction from "./pages/UnderConstruction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "videos",
        element: <VideosPage />,
      },
      {
        path: "playlists",
        element: <PlaylistsPage />,
      },
      {
        path: "groups",
        element: <UnderConstruction />,
      },
      {
        path: "tags",
        element: <TagsPage />,
      },
    ],
  },
]);
