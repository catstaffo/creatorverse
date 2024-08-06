import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Root() {
  const location = useLocation();
  const pathname = location.pathname;

  const nonHeaderPaths = ["/"];
  const hideHeader = nonHeaderPaths.includes(pathname);

  return (
    <main className="mb-4">
      {!hideHeader && <Header />}
      <Outlet />
    </main>
  );
}
