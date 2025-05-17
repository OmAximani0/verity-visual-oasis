
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, X, MessageSquare, FilePlus2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const DocumentAnalysis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    summary: string;
    keyPoints: string[];
    recommendations: string[];
    riskAreas: string[];
  } | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: "Hello! I can answer questions about the analyzed document. How can I help you?" },
  ]);
  const [question, setQuestion] = useState("");
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResult(null);
  };

  const analyzeDocument = async () => {
    if (!file) {
      toast.error("Please upload a document first");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      // TO-DO: Connect to backend for document analysis
      // const formData = new FormData();
      // formData.append('document', file);
      // const response = await analyzeDocumentAPI(formData);
      
      // Mock response
      setTimeout(() => {
        const mockResult = {
          summary: "This legal document outlines terms and conditions for a software service agreement between the provider and client. It covers usage rights, privacy policies, termination conditions, and liability limitations. The agreement is governed by state law and includes provisions for dispute resolution through arbitration.",
          keyPoints: [
            "The agreement establishes a non-exclusive, non-transferable license to use the software.",
            "Users must be at least 18 years old to accept the terms.",
            "The service provider reserves the right to modify the terms with 30 days notice.",
            "Termination can occur with 14 days written notice from either party.",
            "Data privacy is governed by the accompanying Privacy Policy document."
          ],
          recommendations: [
            "Review the liability limitations as they significantly limit potential compensation.",
            "Note the automatic renewal clause that requires 30-day cancellation notice.",
            "Consider the jurisdiction limitations for any potential disputes.",
            "Be aware of the data usage terms that allow anonymized data collection."
          ],
          riskAreas: [
            "Broad indemnification requirements for the client",
            "Limited warranty coverage",
            "Mandatory arbitration clause restricts legal options",
            "Unilateral amendment provisions favor the provider"
          ]
        };

        setResult(mockResult);
        setAnalyzing(false);
      }, 3000);
    } catch (error) {
      console.error("Error analyzing document:", error);
      toast.error("Failed to analyze the document");
      setAnalyzing(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: question
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsAskingQuestion(true);
    setQuestion("");
    
    try {
      // TO-DO: Connect to backend for Q&A functionality
      // const response = await askQuestionAPI({ question, document: documentId });
      
      // Mock response
      setTimeout(() => {
        let response = "";
        
        if (question.toLowerCase().includes("termination")) {
          response = "The agreement allows termination with 14 days written notice from either party. However, the client must pay any outstanding fees upon termination. The service provider can terminate immediately if the client breaches any terms.";
        } else if (question.toLowerCase().includes("liability") || question.toLowerCase().includes("damages")) {
          response = "The agreement limits liability to the amount paid by the client in the 12 months preceding the claim. It explicitly excludes indirect, incidental, and consequential damages. Neither party will be liable for force majeure events.";
        } else if (question.toLowerCase().includes("privacy") || question.toLowerCase().includes("data")) {
          response = "Data privacy is governed by the Privacy Policy document. The service provider collects user data for service improvement and may share anonymized data with third parties. Users can request their data under applicable privacy laws.";
        } else {
          response = "Based on the analyzed document, this appears to be related to the terms and conditions of the software service agreement. The specific clause might not be directly addressed in the summary, but generally, the agreement covers usage rights, limitations, and obligations between the provider and client.";
        }
        
        const assistantMessage: Message = {
          id: messages.length + 2,
          role: "assistant",
          content: response
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsAskingQuestion(false);
      }, 1500);
    } catch (error) {
      console.error("Error asking question:", error);
      toast.error("Failed to get an answer");
      setIsAskingQuestion(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Legal Document Analyzer</h1>
        <p className="text-muted-foreground">
          Upload legal documents for AI-powered analysis, summaries, and interactive Q&A.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>
                Upload a legal document to analyze and summarize
              </CardDescription>
            </CardHeader>
            <CardContent>
              {file ? (
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-[#766be9]" />
                    <div>
                      <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={clearFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-md p-8 text-center">
                  <FilePlus2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm font-medium">
                    Drag and drop your document here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Supports PDF, DOCX, and TXT files
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    className="hidden"
                    id="document-upload"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="document-upload">
                    <Button variant="outline" className="mt-2" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={analyzeDocument} 
                disabled={analyzing || !file} 
                className="w-full bg-[#766be9] hover:bg-[#655bd9]"
              >
                {analyzing ? "Analyzing..." : "Analyze Document"}
              </Button>
            </CardFooter>
          </Card>
          
          {analyzing && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-muted-foreground">Analyzing document...</p>
                  <p className="text-xs text-muted-foreground mt-2">This may take a minute</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {result && !analyzing && (
            <Card>
              <CardHeader>
                <CardTitle>Document Summary</CardTitle>
                <CardDescription>
                  AI-generated summary of the key document contents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-6">{result.summary}</p>

                <Collapsible className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Key Points</h3>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <Separator className="my-2" />
                  <CollapsibleContent>
                    <ul className="space-y-1 mt-2">
                      {result.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm flex">
                          <span className="mr-2">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Recommendations</h3>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <Separator className="my-2" />
                  <CollapsibleContent>
                    <ul className="space-y-1 mt-2">
                      {result.recommendations.map((recommendation, index) => (
                        <li key={index} className="text-sm flex">
                          <span className="mr-2">•</span>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Risk Areas</h3>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <Separator className="my-2" />
                  <CollapsibleContent>
                    <ul className="space-y-1 mt-2">
                      {result.riskAreas.map((risk, index) => (
                        <li key={index} className="text-sm flex">
                          <span className="mr-2">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Tabs defaultValue="chat" className="h-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Ask Questions</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="h-full">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Q&A Assistant</CardTitle>
                  <CardDescription>
                    Ask questions about the document and get AI-powered answers
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <div className="h-[350px] overflow-y-auto pr-2 mb-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {result ? "Ask questions about the document" : "Upload and analyze a document first"}
                        </p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.role === "user"
                                ? "bg-[#766be9] text-white"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                    {isAskingQuestion && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse delay-150"></div>
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAskQuestion();
                    }}
                    className="w-full flex gap-2"
                  >
                    <Input
                      placeholder={result ? "Ask a question about the document..." : "Upload a document first to ask questions"}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      disabled={!result || isAskingQuestion}
                    />
                    <Button
                      type="submit"
                      disabled={!result || isAskingQuestion || !question.trim()}
                      className="bg-[#766be9] hover:bg-[#655bd9]"
                    >
                      Send
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalysis;
