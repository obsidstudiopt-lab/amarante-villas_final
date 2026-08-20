import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider } from "./i18n/LanguageContext";
import useSmoothScroll from "./hooks/useSmoothScroll";
import Home from "./pages/Home";
import PropertyPage from "./pages/PropertyPage";

function Shell() {
  useSmoothScroll();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/propriedade/:slug" element={<PropertyPage />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Toaster position="top-center" theme="light" />
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </LanguageProvider>
    </div>
  );
}

export default App;
