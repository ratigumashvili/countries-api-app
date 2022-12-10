import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CountryPage from "./pages/CountryPage";

import useFetch from "./hooks/useFetch";

import { Routes, Route } from "react-router-dom";

const URL = `https://restcountries.com/v2/`;

function App() {
  const { fetched: initialData, loading } = useFetch(URL + "all");
  return (
    <div className="app-wrapper">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<MainPage initialData={initialData} loading={loading} />}
        />
        <Route path="/countries/:name" element={<CountryPage />} />
      </Routes>
    </div>
  );
}

export default App;
