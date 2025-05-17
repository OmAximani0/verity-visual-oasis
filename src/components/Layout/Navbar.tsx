
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu, LogOut, User } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock authentication state - replace with actual auth state management
  const isAuthenticated = location.pathname !== "/login" && location.pathname !== "/signup";
  
  const handleLogout = () => {
    // TO-DO: Connect to backend for logout functionality
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  const navLinks = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Fake Detection", path: "/fake-detection" },
    { title: "Phishing Detection", path: "/phishing-detection" },
    { title: "Document Analysis", path: "/document-analysis" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#766be9] flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="font-bold text-xl hidden md:block text-foreground">SecureAI</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated && navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors hover:text-[#766be9] ${
                location.pathname === link.path
                  ? "text-[#766be9] font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>
        
        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#766be9] hover:bg-[#655bd9]" size="sm">Sign up</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User size={16} />
                  <span>Profile</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-6 mt-6">
                {isAuthenticated ? (
                  <>
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`text-sm transition-colors hover:text-[#766be9] ${
                          location.pathname === link.path
                            ? "text-[#766be9] font-medium"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                    <Link
                      to="/profile"
                      className="text-sm text-muted-foreground transition-colors hover:text-[#766be9]"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="justify-start px-0 text-sm text-muted-foreground hover:text-[#766be9]"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-sm text-muted-foreground transition-colors hover:text-[#766be9]"
                      onClick={() => setIsOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="text-sm text-muted-foreground transition-colors hover:text-[#766be9]"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
