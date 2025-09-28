
import React from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  fileName: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, fileName }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full max-w-lg h-48 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-slate-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-slate-400">
            <span className="font-semibold">انقر للتحميل</span> أو اسحب وأفلت ملف Excel
          </p>
          <p className="text-xs text-slate-500">XLS, XLSX</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept=".xlsx, .xls" onChange={handleFileChange} />
      </label>
      {fileName && (
        <p className="mt-4 text-sm text-green-400">
          تم تحميل الملف: <span className="font-medium">{fileName}</span>
        </p>
      )}
    </div>
  );
};

export default FileUpload;
