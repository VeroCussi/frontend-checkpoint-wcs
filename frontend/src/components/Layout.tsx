import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function PageLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
