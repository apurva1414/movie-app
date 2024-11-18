import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";
import Favorites from "./pages/Favorites";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
