import React from 'react';

export default function SummaryCard({ icons, text, number }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-200 mb-4">
      <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl">
        {icons}
      </div>
      <div>
        <p className="text-sm text-gray-500">{text}</p>
        <p className="text-xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  );
}
