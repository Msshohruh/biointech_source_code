import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import News from "./components/News";
import Articles from "./components/Articles";
import Videos from "./components/Videos";
import NewsPage from "./pages/NewsPage";
import NewsList from "./pages/NewsList";
import ArticlePage from "./pages/ArticlePage";
import VideoPage from "./pages/VideoPage";
import VideosList from "./pages/VideosList";
import Scientific from "./components/Scientific";
import ScientificPage from "./pages/ScientificPage";
import ScientificList from "./pages/ScientificList";
import Books from "./components/Books";
import BooksList from "./pages/BooksList";
import Laws from "./components/Laws";
import LawsList from "./pages/LawsList";
import LawsPage from "./pages/LawsPage";
import Invitro from "./components/Invitro";
import InvitroList from "./pages/InvitroList";
import InvitroPage from "./pages/InvitroPage";
import Experiments from "./components/Experiments";
import ExperList from "./pages/ExperList";
import ExperPage from "./pages/ExperPage";
import ArticleList from "./pages/ArticleList";
import { useSelector } from "react-redux";
function App() {
  const currentUser = useSelector((state) => state);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />

          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:newsId" element={<NewsPage />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />
          <Route path="/videos" element={<VideosList />} />
          <Route path="/videos/:videoId" element={<VideoPage />} />
          <Route
            path="/scientific/:scientificId"
            element={<ScientificPage />}
          />
          <Route path="/scientific" element={<ScientificList />} />
          <Route path="/laws" element={<LawsList />} />
          <Route path="/laws/:lawsId" element={<LawsPage />} />
          <Route path="/invitro" element={<InvitroList />} />
          <Route path="/invitro/:invitroId" element={<InvitroPage />} />
          <Route path="/experiments" element={<ExperList />} />
          <Route path="/experiments/:experId" element={<ExperPage />} />
          <Route path="/books" element={<BooksList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Admin></Admin>
            </RequireAuth>
          }
        >
          <Route path="news" element={<News />} />
          <Route path="articles" element={<Articles />} />
          <Route path="videos" element={<Videos />} />
          <Route path="scientific" element={<Scientific />} />
          <Route path="books" element={<Books />} />
          <Route path="laws" element={<Laws />} />
          <Route path="invitro" element={<Invitro />} />
          <Route path="experiments" element={<Experiments />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
