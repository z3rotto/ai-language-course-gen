import React, { useState, useCallback } from 'react';
import { CourseData } from './types';
import { generateCourseFromJSON, generateCourseFromPrompt } from './services/geminiService';
import CreationScreen from './components/CreationScreen';
import { CourseViewer } from './components/CourseViewer';
import Spinner from './components/common/Spinner';

const App: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSubmit = useCallback(async (fileContent: string) => {
    setIsLoading(true);
    setError(null);
    setCourseData(null);
    try {
      const data = await generateCourseFromJSON(fileContent);
      setCourseData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChatSubmit = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setCourseData(null);
    try {
      const data = await generateCourseFromPrompt(prompt);
      setCourseData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleLoadCourse = useCallback((data: CourseData) => {
    setIsLoading(false);
    setError(null);
    setCourseData(data);
  }, []);


  const handleReset = () => {
    setCourseData(null);
    setError(null);
    setIsLoading(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-slate-900">
          <Spinner />
          <p className="mt-4 text-lg text-slate-300 animate-pulse">
            Our AI is crafting your language course...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-slate-900 p-4">
          <div className="bg-red-900/50 border border-red-700 text-red-200 p-6 rounded-lg max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Generation Failed</h2>
            <p className="mb-6">{error}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-brand-primary hover:bg-brand-secondary text-white font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (courseData) {
      return <CourseViewer courseData={courseData} onReset={handleReset} />;
    }

    return <CreationScreen onFileSubmit={handleFileSubmit} onChatSubmit={handleChatSubmit} onLoadCourse={handleLoadCourse} />;
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <main className="flex-grow flex flex-col">
          {renderContent()}
      </main>
      <footer className="flex-shrink-0 text-center py-3 bg-slate-900 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          Mauro Col 2025 &copy; Beta Version 0.2
        </p>
      </footer>
    </div>
  );
};

export default App;
