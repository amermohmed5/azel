import React, { useState, useMemo } from 'react';
import type { Item } from './types';
import FileUpload from './components/FileUpload';
import SearchBar from './components/SearchBar';
import ResultsTable from './components/ResultsTable';

declare var XLSX: any;

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setError(null);
    setFileName(null);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: Item[] = XLSX.utils.sheet_to_json(worksheet, {
          header: ['اسم المادة', 'السعر'],
          range: 1 // Skip the header row in the excel file
        });

        // Filter out any rows where the item name is not a string (e.g., empty rows)
        const validItems = json.filter(item => typeof item['اسم المادة'] === 'string' && item['اسم المادة'].trim() !== '');
        
        setItems(validItems);
        setFileName(file.name);
      } catch (e) {
        console.error("Error parsing Excel file:", e);
        setError("حدث خطأ أثناء معالجة الملف. يرجى التأكد من أنه ملف Excel صالح.");
        setItems([]);
      }
    };
    
    reader.onerror = () => {
        console.error("Error reading file");
        setError("لا يمكن قراءة الملف المحدد.");
        setItems([]);
    }

    reader.readAsBinaryString(file);
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return items;
    }
    return items.filter((item) => {
      // Ensure the price is a string for the search comparison
      const priceString = String(item['السعر']);
      return priceString.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [items, searchTerm]);

  const hasData = items.length > 0;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-2">
          باحث بيانات Excel
        </h1>
        <p className="text-lg text-slate-400">
          قم بتحميل ملف Excel للبحث عن أسماء المواد وأسعارها
        </p>
      </header>
      
      <main className="w-full flex flex-col items-center gap-8">
        <FileUpload onFileSelect={handleFileSelect} fileName={fileName} />
        
        {error && <p className="text-red-400 bg-red-900/50 border border-red-700 rounded-md p-3 text-sm">{error}</p>}
        
        <div className="w-full max-w-lg">
           <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              isDisabled={!hasData}
            />
        </div>

        {hasData && (
          <div className="w-full mt-4">
            <ResultsTable items={filteredItems} searchTerm={searchTerm} />
          </div>
        )}
      </main>

      <footer className="mt-auto pt-8 text-center text-slate-500 text-sm">
        <p>تم التطوير بواسطة مهندس React وخبير Gemini API</p>
      </footer>
    </div>
  );
};

export default App;