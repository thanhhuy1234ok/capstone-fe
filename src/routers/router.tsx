import { createBrowserRouter } from "react-router-dom";
import LayoutSelector from "@/components/layout/layout.selector";
import LoginPage from "@/pages/auth/login";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <LayoutSelector />
  },
  {
    path: "/login",
    element: <LoginPage/>
  }
]);

export default router;