
import React from 'react';
import CGPACalculator from '@/components/CGPACalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/10 z-[-1]"></div>
      <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,122,255,0.05)_0%,rgba(255,255,255,0)_100%)] fixed inset-0 z-[-1]"></div>
      <CGPACalculator />
    </div>
  );
};

export default Index;
