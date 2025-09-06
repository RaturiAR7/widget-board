import React, { useState } from "react";
import { Plus, Settings, BarChart3 } from "lucide-react";
import useDashboardStore from "../store/dashBoardStore";
import Widget from "./Widget";
import AddWidgetModal from "./AddWidgetModal";
import WidgetManagementModal from "./WidgetManagementModal";

function Dashboard() {
  const { categories, addWidget, removeWidget, toggleWidget } =
    useDashboardStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const openAddModal = (categoryId = "") => {
    setSelectedCategory(categoryId);
    setIsAddModalOpen(true);
  };

  const handleAddWidget = (categoryId, widget) => {
    addWidget(categoryId, widget);
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    if (window.confirm("Are you sure you want to remove this widget?")) {
      removeWidget(categoryId, widgetId);
    }
  };

  const handleToggleWidget = (categoryId, widgetId) => {
    toggleWidget(categoryId, widgetId);
  };

  // Calculate total widgets count
  const totalWidgets = Object.values(categories).reduce((total, category) => {
    return (
      total +
      Object.values(category.widgets).filter((widget) => widget.enabled).length
    );
  }, 0);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <BarChart3 size={24} className='text-blue-600 mr-3' />
              <h1 className='text-2xl font-bold text-gray-900'>
                CNAPP Dashboard
              </h1>
              <span className='ml-4 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded'>
                {totalWidgets} widgets
              </span>
            </div>
            <div className='flex space-x-3'>
              <button
                onClick={() => setIsManageModalOpen(true)}
                className='flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <Settings size={16} />
                <span>Manage Widgets</span>
              </button>
              <button
                onClick={() => openAddModal()}
                className='flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                <Plus size={16} />
                <span>Add Widget</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Categories and Widgets */}
        <div className='space-y-8'>
          {Object.entries(categories).map(([categoryId, category]) => {
            const enabledWidgets = Object.entries(category.widgets).filter(
              ([_, widget]) => widget.enabled
            );

            return (
              <div key={categoryId} className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <h2 className='text-lg font-semibold text-gray-900'>
                      {category.name}
                    </h2>
                    <span className='ml-3 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded'>
                      {enabledWidgets.length} widget
                      {enabledWidgets.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    onClick={() => openAddModal(categoryId)}
                    className='flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'
                  >
                    <Plus size={14} />
                    <span>Add Widget</span>
                  </button>
                </div>

                {enabledWidgets.length === 0 ? (
                  <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
                    <div className='text-gray-500 mb-2'>
                      No widgets in this category
                    </div>
                    <button
                      onClick={() => openAddModal(categoryId)}
                      className='text-blue-600 hover:text-blue-700 text-sm font-medium'
                    >
                      Add your first widget
                    </button>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {enabledWidgets.map(([widgetId, widget]) => (
                      <Widget
                        key={widgetId}
                        widget={widget}
                        onRemove={() =>
                          handleRemoveWidget(categoryId, widgetId)
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {totalWidgets === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-500 text-lg mb-4'>
              Your dashboard is empty
            </div>
            <button
              onClick={() => openAddModal()}
              className='inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
              <Plus size={20} />
              <span>Add Your First Widget</span>
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddWidgetModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedCategory("");
        }}
        onAdd={handleAddWidget}
        categories={categories}
        selectedCategory={selectedCategory}
      />

      <WidgetManagementModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        categories={categories}
        onToggleWidget={handleToggleWidget}
      />
    </div>
  );
}

export default Dashboard;
