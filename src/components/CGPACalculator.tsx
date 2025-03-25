
import React, { useState, useEffect } from 'react';
import { PlusCircle, Calculator, RotateCcw, Share2 } from 'lucide-react';
import SubjectRow from './SubjectRow';
import Notification from './Notification';
import ResultCard from './ResultCard';

interface Subject {
  id: number;
  grade: string;
  credit: string;
}

const CGPACalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [nextId, setNextId] = useState(1);
  const [cgpa, setCgpa] = useState('0.00');
  const [isCalculated, setIsCalculated] = useState(false);
  const [notification, setNotification] = useState({ visible: false, message: '' });

  // Load data from URL if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    const cgpaParam = params.get('cgpa');

    if (data) {
      const subjectItems = data.split(',');
      const loadedSubjects = subjectItems.map((item, index) => {
        const [grade, credit] = item.split('-');
        return { id: index + 1, grade, credit };
      });

      setSubjects(loadedSubjects);
      setNextId(loadedSubjects.length + 1);
      
      if (cgpaParam) {
        setCgpa(cgpaParam);
        setIsCalculated(true);
      }
    } else {
      // Add a default empty subject if no data in URL
      addSubject();
    }
  }, []);

  const addSubject = (grade = '', credit = '') => {
    const newSubject = { id: nextId, grade, credit };
    setSubjects([...subjects, newSubject]);
    setNextId(nextId + 1);
  };

  const removeSubject = (id: number) => {
    if (subjects.length === 1) {
      // If it's the last subject, just clear its values
      setSubjects([{ id: 1, grade: '', credit: '' }]);
      setNextId(2);
    } else {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const calculateCGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    subjects.forEach((subject, index) => {
      const gradeInput = document.getElementById(`grade${index + 1}`) as HTMLInputElement;
      const creditInput = document.getElementById(`credit${index + 1}`) as HTMLInputElement;
      
      if (gradeInput && creditInput) {
        const grade = parseFloat(gradeInput.value) || 0;
        const credit = parseFloat(creditInput.value) || 0;
        
        totalGradePoints += grade * credit;
        totalCredits += credit;
      }
    });

    const calculatedCGPA = totalCredits === 0 ? 0 : (totalGradePoints / totalCredits);
    const formattedCGPA = calculatedCGPA.toFixed(2);
    
    setCgpa(formattedCGPA);
    setIsCalculated(true);
    
    // Animate the result card
    const resultCard = document.getElementById('result-card');
    if (resultCard) {
      resultCard.classList.add('scale-in');
    }
  };

  const resetCalculator = () => {
    setSubjects([{ id: 1, grade: '', credit: '' }]);
    setNextId(2);
    setCgpa('0.00');
    setIsCalculated(false);
  };

  const shareCGPA = () => {
    const data = subjects.map(subject => {
      const gradeInput = document.getElementById(`grade${subject.id}`) as HTMLInputElement;
      const creditInput = document.getElementById(`credit${subject.id}`) as HTMLInputElement;
      
      const grade = gradeInput?.value || '0';
      const credit = creditInput?.value || '0';
      
      return `${grade}-${credit}`;
    });

    const baseUrl = window.location.href.split('?')[0];
    const shareUrl = `${baseUrl}?data=${data.join(',')}&cgpa=${cgpa}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      showNotification('Link copied to clipboard');
    });
  };

  const showNotification = (message: string) => {
    setNotification({ visible: true, message });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  return (
    <div className="fade-in">
      <div className="w-full max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="w-20 h-1 bg-primary/30 rounded-full mb-6"></div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">CGPA Calculator</h1>
          <p className="mt-3 text-muted-foreground text-center max-w-2xl">
            Calculate your Cumulative Grade Point Average with precision and ease
          </p>
        </div>
        
        <div className="glass rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 sm:p-8">
            <div className="overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary">
                  <thead>
                    <tr>
                      <th className="py-3.5 px-4 text-left text-sm font-semibold text-foreground/70 w-[15%]">
                        Subject
                      </th>
                      <th className="py-3.5 px-4 text-left text-sm font-semibold text-foreground/70 w-[35%]">
                        Grade (1-10)
                      </th>
                      <th className="py-3.5 px-4 text-left text-sm font-semibold text-foreground/70 w-[35%]">
                        Credit (1-5)
                      </th>
                      <th className="py-3.5 px-4 text-left text-sm font-semibold text-foreground/70 w-[15%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary/50">
                    {subjects.map((subject, index) => (
                      <SubjectRow
                        key={subject.id}
                        index={index + 1}
                        onDelete={() => removeSubject(subject.id)}
                        defaultGrade={subject.grade}
                        defaultCredit={subject.credit}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button 
                onClick={() => addSubject()} 
                className="button-secondary"
                aria-label="Add subject"
              >
                <PlusCircle className="w-5 h-5 mr-1" />
                Add Subject
              </button>
              
              <button 
                onClick={calculateCGPA} 
                className="button-primary"
                aria-label="Calculate CGPA"
              >
                <Calculator className="w-5 h-5 mr-1" />
                Calculate CGPA
              </button>
              
              <button 
                onClick={resetCalculator} 
                className="button-secondary"
                aria-label="Reset calculator"
              >
                <RotateCcw className="w-5 h-5 mr-1" />
                Reset
              </button>
              
              <button 
                onClick={shareCGPA} 
                className="button-secondary"
                aria-label="Share CGPA"
              >
                <Share2 className="w-5 h-5 mr-1" />
                Share
              </button>
            </div>
            
            <div id="result-card">
              <ResultCard cgpa={cgpa} isCalculated={isCalculated} />
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Designed for simplicity and precision. Calculate your academic performance easily.
          </p>
        </div>
      </div>
      
      <Notification 
        message={notification.message} 
        isVisible={notification.visible} 
        onClose={closeNotification} 
      />
    </div>
  );
};

export default CGPACalculator;
