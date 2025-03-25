
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10 z-[-1]"></div>
      <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,122,255,0.05)_0%,rgba(255,255,255,0)_100%)] fixed inset-0 z-[-1]"></div>
      
      <div className="w-full max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground mb-6 animate-fade-in">
            Welcome to CGPA Calculator
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            A professional tool to calculate and track your academic performance with ease.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white px-6 py-6 text-lg">
              <Link to="/calculate">
                Calculate CGPA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="px-6 py-6 text-lg">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 glass p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Why Use Our CGPA Calculator?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2">Simple & Intuitive</h3>
                <p className="text-muted-foreground">Easy-to-use interface for quick calculations.</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2">Accurate Results</h3>
                <p className="text-muted-foreground">Precise CGPA calculations based on your inputs.</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2">Shareable</h3>
                <p className="text-muted-foreground">Generate links to share your CGPA with others.</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2">Responsive Design</h3>
                <p className="text-muted-foreground">Works perfectly on all devices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
