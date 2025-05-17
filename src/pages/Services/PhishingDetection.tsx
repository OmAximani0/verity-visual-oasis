
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ExternalLink, AlertTriangle, CheckCircle, Network } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const PhishingDetection = () => {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    isPhishing: boolean;
    score: number;
    connectedSites: number;
    phishingSites: number;
    legitimateSites: number;
    details: string;
    connectionData: {
      id: number;
      url: string;
      status: "legitimate" | "suspicious" | "phishing";
      score: number;
    }[];
    chartData: {
      name: string;
      value: number;
      description: string;
    }[];
  } | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const analyzeUrl = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL to analyze");
      return;
    }

    // Simple URL validation
    try {
      new URL(url.startsWith("http") ? url : `http://${url}`);
    } catch (e) {
      toast.error("Please enter a valid URL");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      // TO-DO: Connect to backend for URL analysis
      // const response = await analyzeUrlAPI({ url });
      
      // Mock response
      setTimeout(() => {
        // Generate random data for the mock result
        const phishingSites = Math.floor(Math.random() * 5);
        const legitimateSites = Math.floor(Math.random() * 7) + 1;
        const totalSites = phishingSites + legitimateSites;
        const isPhishing = phishingSites > 0;
        const score = phishingSites > 0 ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 30);
        
        // Generate random connected sites
        const connectionData = Array.from({ length: totalSites }, (_, i) => {
          const isPhish = i < phishingSites;
          return {
            id: i,
            url: `example${i}.com${isPhish ? '/login' : ''}`,
            status: isPhish ? "phishing" : Math.random() > 0.7 ? "suspicious" : "legitimate",
            score: isPhish ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40),
          } as const;
        });

        // Generate chart data
        const chartData = [
          {
            name: "SSL Certificate",
            value: Math.floor(Math.random() * 100),
            description: "Validity of the SSL certificate"
          },
          {
            name: "Domain Age",
            value: Math.floor(Math.random() * 100),
            description: "Age of the domain registration"
          },
          {
            name: "URL Structure",
            value: Math.floor(Math.random() * 100),
            description: "Analysis of URL components"
          },
          {
            name: "Content Analysis",
            value: Math.floor(Math.random() * 100),
            description: "Analysis of website content"
          },
          {
            name: "Reputation",
            value: Math.floor(Math.random() * 100),
            description: "Website reputation score"
          },
        ];

        const mockResult = {
          isPhishing,
          score,
          connectedSites: totalSites,
          phishingSites,
          legitimateSites,
          details: isPhishing
            ? "The analyzed website shows characteristics commonly associated with phishing attempts. It connects to multiple suspicious domains and requests sensitive information."
            : "The analyzed website appears to be legitimate based on our security checks.",
          connectionData,
          chartData,
        };

        setResult(mockResult);
        setAnalyzing(false);
      }, 2500);
    } catch (error) {
      console.error("Error analyzing URL:", error);
      toast.error("Failed to analyze the URL");
      setAnalyzing(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Phishing Website Detection</h1>
        <p className="text-muted-foreground">
          Check if a website is attempting to steal information or impersonate a legitimate site.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Website Analysis</CardTitle>
              <CardDescription>
                Enter a URL to analyze for phishing attempts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <div className="flex">
                    <Input
                      id="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={handleUrlChange}
                      className="rounded-r-none"
                    />
                    <Button
                      onClick={analyzeUrl}
                      disabled={analyzing || !url.trim()}
                      className="rounded-l-none bg-[#766be9] hover:bg-[#655bd9]"
                    >
                      {analyzing ? "Analyzing..." : "Analyze"}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-md space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#766be9]" />
                    How it works
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI analyzes the website, its connections, and behavior patterns to identify phishing attempts.
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 mt-0.5">•</div>
                      <span>Analyzes site content and structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 mt-0.5">•</div>
                      <span>Maps connections to other websites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 mt-0.5">•</div>
                      <span>Checks for known phishing patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="min-w-4 h-4 mt-0.5">•</div>
                      <span>Verifies domain authenticity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground italic">
                Note: Analysis results are for informational purposes only.
              </p>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Detection Results</CardTitle>
              <CardDescription>
                {result ? "Analysis of website and its connections" : "Results will appear here after analysis"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyzing ? (
                <div className="h-[400px] flex flex-col items-center justify-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-muted-foreground">Analyzing website connections...</p>
                </div>
              ) : result ? (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 p-4 rounded-md bg-muted/50">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        result.isPhishing ? "bg-red-100" : "bg-green-100"
                      }`}>
                        {result.isPhishing ? (
                          <AlertTriangle className="h-8 w-8 text-red-600" />
                        ) : (
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${
                        result.isPhishing ? "text-red-600" : "text-green-600"
                      }`}>
                        {result.isPhishing ? "Potential Phishing Detected" : "Website Appears Safe"}
                      </h3>
                      <p className="text-muted-foreground">{result.details}</p>
                      <div className="mt-2 flex flex-wrap gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Risk Score</p>
                          <p className="text-lg font-medium">{result.score}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Connected Sites</p>
                          <p className="text-lg font-medium">{result.connectedSites}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Suspicious Connections</p>
                          <p className="text-lg font-medium">{result.phishingSites}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Network className="h-5 w-5 text-[#766be9]" />
                      Website Connection Graph
                    </h3>
                    <div className="h-[300px] bg-background rounded-md border p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={result.connectionData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="url" tick={{ fontSize: 12 }} />
                          <YAxis 
                            domain={[0, 100]} 
                            tick={{ fontSize: 12 }}
                            label={{ 
                              value: 'Risk Score (%)', 
                              angle: -90, 
                              position: 'insideLeft',
                              style: { textAnchor: 'middle', fontSize: 12 } 
                            }} 
                          />
                          <Tooltip 
                            formatter={(value, name) => [`${value}%`, 'Risk Score']}
                            labelFormatter={(label) => `Domain: ${label}`}
                          />
                          <Legend />
                          <Bar 
                            dataKey="score" 
                            name="Risk Score" 
                            fill="#766be9"
                          >
                            {result.connectionData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={
                                  entry.status === "phishing" 
                                    ? "#ef4444" 
                                    : entry.status === "suspicious" 
                                      ? "#f59e0b" 
                                      : "#10b981"
                                } 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Security Metrics</h3>
                    <div className="h-[250px] bg-background rounded-md border p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={result.chartData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis 
                            domain={[0, 100]} 
                            tick={{ fontSize: 12 }}
                            label={{ 
                              value: 'Score', 
                              angle: -90, 
                              position: 'insideLeft',
                              style: { textAnchor: 'middle', fontSize: 12 } 
                            }}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Score']}
                            labelFormatter={(label, payload) => {
                              if (payload && payload.length > 0) {
                                return `${label}: ${(payload[0].payload as any).description}`;
                              }
                              return label;
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#766be9" 
                            name="Security Score"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Analysis Yet</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Enter a website URL and click analyze to check for phishing attempts and view connection graphs.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhishingDetection;
