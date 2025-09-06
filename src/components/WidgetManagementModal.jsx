import { useState } from "react";
import { Search, X, Settings } from "lucide-react";

function WidgetManagementModal({
  isOpen,
  onClose,
  categories,
  onToggleWidget,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  // Get all widgets for search
  const allWidgets = [];
  Object.entries(categories).forEach(([catId, category]) => {
    Object.entries(category.widgets).forEach(([widgetId, widget]) => {
      allWidgets.push({
        ...widget,
        categoryId: catId,
        categoryName: category.name,
      });
    });
  });

  const filteredCategories = Object.entries(categories)
    .map(([catId, category]) => ({
      ...category,
      widgets: Object.entries(category.widgets).filter(([_, widget]) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.widgets.length > 0);

  const totalWidgets = allWidgets.length;
  const enabledWidgets = allWidgets.filter((w) => w.enabled).length;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[85vh] overflow-hidden flex flex-col'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold flex items-center'>
            <Settings size={20} className='mr-2' />
            Manage Widgets
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100'
          >
            <X size={20} />
          </button>
        </div>

        {/* Search and Stats */}
        <div className='mb-4 space-y-3'>
          <div className='relative'>
            <Search
              size={20}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            />
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search widgets...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div className='flex justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded'>
            <span>Total Widgets: {totalWidgets}</span>
            <span>Enabled: {enabledWidgets}</span>
            <span>Hidden: {totalWidgets - enabledWidgets}</span>
          </div>
        </div>

        {/* Widget List */}
        <div className='flex-1 overflow-y-auto'>
          {filteredCategories.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              {searchTerm
                ? "No widgets found matching your search."
                : "No widgets available."}
            </div>
          ) : (
            <div className='space-y-4'>
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className='border rounded-lg p-4 bg-gray-50'
                >
                  <div className='flex justify-between items-center mb-3'>
                    <h3 className='font-medium text-gray-900'>
                      {category.name}
                    </h3>
                    <span className='text-sm text-gray-500'>
                      {category.widgets.length} widget
                      {category.widgets.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    {category.widgets.map(([widgetId, widget]) => (
                      <label
                        key={widgetId}
                        className='flex items-center space-x-3 p-2 rounded hover:bg-white transition-colors cursor-pointer'
                      >
                        <input
                          type='checkbox'
                          checked={widget.enabled}
                          onChange={() => onToggleWidget(category.id, widgetId)}
                          className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                        />
                        <div className='flex-1 min-w-0'>
                          <span
                            className={`text-sm ${
                              widget.enabled ? "text-gray-900" : "text-gray-500"
                            }`}
                          >
                            {widget.name}
                          </span>
                          {!widget.enabled && (
                            <span className='ml-2 text-xs text-gray-400'>
                              (Hidden)
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex justify-between items-center pt-4 border-t'>
          <div className='text-xs text-gray-500'>
            Uncheck widgets to hide them from the dashboard
          </div>
          <button
            onClick={onClose}
            className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default WidgetManagementModal;
