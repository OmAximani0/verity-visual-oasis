
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Image, ShieldCheck } from "lucide-react";

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  link,
  buttonText,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  buttonText: string;
}) => (
  <Card className="overflow-hidden border border-border/40 transition-all duration-200 hover:shadow-md">
    <CardHeader className="bg-muted/50 pb-4">
      <Icon className="h-6 w-6 mb-2 text-[#766be9]" />
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="pt-6 flex justify-end">
      <Link to={link}>
        <Button className="bg-[#766be9] hover:bg-[#655bd9]">
          {buttonText}
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  // This data would typically come from an API
  const userName = "John";
  const services = [
    {
      id: 1,
      title: "Fake Detection",
      description: "Detect fake content in images and text",
      icon: Image,
      link: "/fake-detection",
      buttonText: "Get Started",
    },
    {
      id: 2,
      title: "Phishing Detection",
      description: "Analyze websites for phishing attempts",
      icon: ShieldCheck,
      link: "/phishing-detection",
      buttonText: "Check Websites",
    },
    {
      id: 3,
      title: "Legal Document Analysis",
      description: "Analyze and summarize legal documents",
      icon: FileText,
      link: "/document-analysis",
      buttonText: "Analyze Documents",
    },
  ];

  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">
          Access our suite of AI-powered security and analysis tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <DashboardCard key={service.id} {...service} />
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-br from-[#766be9]/10 to-purple-100/30 rounded-lg p-8">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold mb-3">Enhance your security</h2>
          <p className="text-muted-foreground mb-6">
            Our AI-powered platform helps you detect threats and analyze documents with ease. Protect yourself from fake content, phishing attempts, and understand legal documents better.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#766be9] hover:bg-[#655bd9]">
              Explore Premium Plans
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
