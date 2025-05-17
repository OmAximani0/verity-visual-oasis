
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 mt-4">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <footer className="py-6 border-t mt-auto">
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
