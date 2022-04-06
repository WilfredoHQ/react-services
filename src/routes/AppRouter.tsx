import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>

        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};
