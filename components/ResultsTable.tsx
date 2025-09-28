import React from 'react';
import type { Item } from '../types';

interface ResultsTableProps {
  items: Item[];
  searchTerm: string;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ items, searchTerm }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        <p>لم يتم العثور على نتائج.</p>
      </div>
    );
  }

  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <strong key={i} className="text-sky-400 font-semibold bg-sky-900/50 rounded-sm">
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg border border-slate-700 bg-slate-800">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-right text-slate-300">
          <thead className="bg-slate-700 text-xs uppercase text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                السعر
              </th>
              <th scope="col" className="px-6 py-3">
                اسم المادة
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-slate-700 odd:bg-slate-800 even:bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4">
                  {getHighlightedText(String(item['السعر']), searchTerm)}
                </td>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                  {item['اسم المادة']}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;