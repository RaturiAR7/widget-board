import React, { useState } from "react";
import { Plus, X } from "lucide-react";

function AddWidgetModal({
  isOpen,
  onClose,
  onAdd,
  categories,
  selectedCategory,
}) {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [category, setCategory] = useState(selectedCategory || "");

  const handleSubmit = () => {
    if (!widgetName.trim() || !widgetText.trim() || !category) {
      alert("Please fill in all fields");
      return;
    }

    const newWidget = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: widgetName.trim(),
      text: widgetText.trim(),
      enabled: true,
    };

    onAdd(category, newWidget);
    setWidgetName("");
    setWidgetText("");
    setCategory("");
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold flex items-center'>
            <Plus size={20} className='mr-2' />
            Add Widget
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100'
          >
            <X size={20} />
          </button>
        </div>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Widget Name *
            </label>
            <input
              type='text'
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              onKeyPress={handleKeyPress}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Enter widget name'
              maxLength={100}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Widget Text *
            </label>
            <textarea
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              rows={4}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
              placeholder='Enter widget content (use line breaks for better formatting)'
              maxLength={500}
            />
            <div className='text-xs text-gray-500 mt-1'>
              {widgetText.length}/500 characters
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>Select a category</option>
              {Object.values(categories).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className='flex justify-end space-x-3 pt-4 border-t'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={handleSubmit}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center'
            >
              <Plus size={16} className='mr-1' />
              Add Widget
            </button>
          </div>
        </div>

        <div className='mt-2 text-xs text-gray-500'>
          Tip: Press Ctrl+Enter to quickly add the widget
        </div>
      </div>
    </div>
  );
}

export default AddWidgetModal;
