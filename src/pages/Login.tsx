
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate login (in a real app, this would connect to a backend)
    setTimeout(() => {
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      setIsLoading(false);
      navigate('/calculate');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center px-4">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10 z-[-1]"></div>
      <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,122,255,0.05)_0%,rgba(255,255,255,0)_100%)] fixed inset-0 z-[-1]"></div>
      
      <div className="glass rounded-2xl p-8 w-full max-w-md shadow-xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your CGPA calculator</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? This is a demo, just click login.
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-secondary">
          <Button variant="outline" asChild className="w-full">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
