import { create } from "zustand";

// Initial dashboard data
const initialData = {
  categories: {
    "cspm-executive": {
      id: "cspm-executive",
      name: "CSPM Executive Dashboard",
      widgets: {
        "cloud-accounts": {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          text: "Connected (2)\nNot Connected (2)",
          enabled: true,
        },
        "cloud-security": {
          id: "cloud-security",
          name: "Cloud Account Risk Assessment",
          text: "Failed (1689)\nWarning (681)\nNot Available (36)\nPassed (7253)",
          enabled: true,
        },
      },
    },
    "cwpp-dashboard": {
      id: "cwpp-dashboard",
      name: "CWPP Dashboard",
      widgets: {
        "top-alerts": {
          id: "top-alerts",
          name: "Top 5 Namespace Specific Alerts",
          text: "No Graph data available!",
          enabled: true,
        },
        "workload-alerts": {
          id: "workload-alerts",
          name: "Workload Alerts",
          text: "No Graph data available!",
          enabled: true,
        },
      },
    },
    "registry-scan": {
      id: "registry-scan",
      name: "Registry Scan",
      widgets: {
        "image-risk": {
          id: "image-risk",
          name: "Image Risk Assessment",
          text: "Critical (9)\nHigh (150)\nMedium (79)\nLow (2)",
          enabled: true,
        },
        "image-security": {
          id: "image-security",
          name: "Image Security Issues",
          text: "Critical (2)\nHigh (2)\nMedium (0)\nLow (3)",
          enabled: true,
        },
      },
    },
  },
};

const useDashboardStore = create((set) => ({
  ...initialData,

  // Add a new widget to a category
  addWidget: (categoryId, widget) =>
    set((state) => ({
      categories: {
        ...state.categories,
        [categoryId]: {
          ...state.categories[categoryId],
          widgets: {
            ...state.categories[categoryId].widgets,
            [widget.id]: widget,
          },
        },
      },
    })),

  // Remove a widget from a category
  removeWidget: (categoryId, widgetId) =>
    set((state) => {
      const { [widgetId]: removed, ...remainingWidgets } =
        state.categories[categoryId].widgets;
      return {
        categories: {
          ...state.categories,
          [categoryId]: {
            ...state.categories[categoryId],
            widgets: remainingWidgets,
          },
        },
      };
    }),

  // Toggle widget visibility
  toggleWidget: (categoryId, widgetId) =>
    set((state) => ({
      categories: {
        ...state.categories,
        [categoryId]: {
          ...state.categories[categoryId],
          widgets: {
            ...state.categories[categoryId].widgets,
            [widgetId]: {
              ...state.categories[categoryId].widgets[widgetId],
              enabled: !state.categories[categoryId].widgets[widgetId].enabled,
            },
          },
        },
      },
    })),

  // Get all widgets for search functionality
  getAllWidgets: () => {
    const allWidgets = [];
    const state = useDashboardStore.getState();
    Object.entries(state.categories).forEach(([catId, category]) => {
      Object.entries(category.widgets).forEach(([widgetId, widget]) => {
        allWidgets.push({
          ...widget,
          categoryId: catId,
          categoryName: category.name,
        });
      });
    });
    return allWidgets;
  },
}));

export default useDashboardStore;
