import React from "react";
import { X } from "lucide-react";

function Widget({ widget, onRemove }) {
  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-200 min-h-[200px] relative'>
      <button
        onClick={onRemove}
        className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100'
        title='Remove widget'
      >
        <X size={16} />
      </button>
      <h3 className='font-semibold text-gray-900 mb-4 pr-8'>{widget.name}</h3>
      <div className='text-gray-600 whitespace-pre-line text-sm'>
        {widget.text}
      </div>
    </div>
  );
}

export default Widget;
