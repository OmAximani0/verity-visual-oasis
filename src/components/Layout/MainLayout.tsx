
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 SecureAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#766be9] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#766be9] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#766be9] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
