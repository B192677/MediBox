import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../components/logo.jpg";
import toast, { Toaster } from "react-hot-toast";
import {
  ChartBarIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
  UsersIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activity, setActivity] = useState(() => {
    const saved = localStorage.getItem("activity");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    PriceInclTaxes: "",
    Categories: "",
    PharmaCompany: "",
    Drugdetails: "",
    DateofMfg: "",
    DateofExp: "",
  });

  const [newProduct, setNewProduct] = useState({
    title: "",
    PriceInclTaxes: "",
    Categories: "",
    PharmaCompany: "",
    Drugdetails: "",
    DateofMfg: "",
    DateofExp: "",
  });

  const api = axios.create({ baseURL: "http://localhost:3001" });
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = token;
    return config;
  });

  useEffect(() => {
    if (activeTab === "products") {
      api
        .get("/p/getproduct")
        .then((res) => setProducts(res.data))
        .catch((err) => console.error("Error fetching products:", err));
    }
    if (activeTab === "orders") {
      api
        .get("/o/getallorders")
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("activity", JSON.stringify(activity));
  }, [activity]);

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditForm({
      title: product.title,
      PriceInclTaxes: product.PriceInclTaxes || product.priceInclTaxes,
      Categories: product.Categories,
      PharmaCompany: product.PharmaCompany,
      Drugdetails: product.Drugdetails,
      DateofMfg: product.DateofMfg,
      DateofExp: product.DateofExp,
    });
  };

  const handleUpdateProduct = async (id) => {
    try {
      await api.put(`/p/updateproduct/${id}`, editForm);

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...editForm } : p))
      );

      setEditingProduct(null);
      toast.success("Product updated successfully!");

      setActivity((prev) => [
        ...prev,
        {
          product: editForm.title,
          type: "update",
          time: new Date().toLocaleString(),
        },
      ]);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await api.delete(`/p/deleteproduct/${id}`);
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Product deleted successfully!");
        setActivity((prev) => [
          ...prev,
          {
            product: title,
            type: "delete",
            time: new Date().toLocaleString(),
          },
        ]);
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.title || !newProduct.PriceInclTaxes) {
      toast.error("Title and Price are required");
      return;
    }

    const productTitle = newProduct.title; // capture title before resetting
    try {
      const response = await api.post("/p/addproduct", newProduct);
      setProducts((prev) => [...prev, response.data]);
      toast.success("Product added successfully!");
      setActivity((prev) => [
        ...prev,
        {
          product: productTitle,
          type: "add",
          time: new Date().toLocaleString(),
        },
      ]);

      setNewProduct({
        title: "",
        PriceInclTaxes: "",
        Categories: "",
        PharmaCompany: "",
        Drugdetails: "",
        DateofMfg: "",
        DateofExp: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activity");
    window.location.href = "/login";
  };

  const groupedProducts = products.reduce((acc, product) => {
    const category = product.Categories || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm">
        <div className="p-6 flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>

        <nav className="mt-6">
          {[
            { key: "dashboard", icon: ChartBarIcon, label: "Dashboard" },
            { key: "products", icon: CubeIcon, label: "Products" },
            { key: "orders", icon: ShoppingCartIcon, label: "Orders" },
            { key: "activity", icon: ClipboardDocumentListIcon, label: "Activity" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 ${
                activeTab === key
                  ? "bg-blue-50 border-r-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                </div>
                <CubeIcon className="w-8 h-8 text-blue-500" />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                </div>
                <ShoppingCartIcon className="w-8 h-8 text-green-500" />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-800">3</p>
                </div>
                <UsersIcon className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Products</h1>

            {/* Add Product Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Title"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.PriceInclTaxes}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, PriceInclTaxes: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newProduct.Categories}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, Categories: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Pharma Company"
                  value={newProduct.PharmaCompany}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, PharmaCompany: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Drug Details"
                  value={newProduct.Drugdetails}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, Drugdetails: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  type="date"
                  placeholder="Date of Mfg"
                  value={newProduct.DateofMfg}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, DateofMfg: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  type="date"
                  placeholder="Date of Exp"
                  value={newProduct.DateofExp}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, DateofExp: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
              </div>
              <button
                onClick={handleAddProduct}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Product
              </button>
            </div>

            {/* Products List */}
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <div key={category} className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{category}</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-600">Title</th>
                        <th className="text-left p-4 font-medium text-gray-600">Price</th>
                        <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryProducts.map((p) => (
                        <tr key={p._id} className="border-t hover:bg-gray-50">
                          <td className="p-4">
                            {editingProduct === p._id ? (
                              <input
                                type="text"
                                value={editForm.title}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, title: e.target.value })
                                }
                                className="border p-2 rounded w-full"
                              />
                            ) : (
                              <span className="font-medium">{p.title}</span>
                            )}
                          </td>
                          <td className="p-4">
                            {editingProduct === p._id ? (
                              <input
                                type="number"
                                value={editForm.PriceInclTaxes}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    PriceInclTaxes: e.target.value,
                                  })
                                }
                                className="border p-2 rounded w-full"
                              />
                            ) : (
                              <span className="text-green-600 font-semibold">
                                ₹{p.PriceInclTaxes || p.priceInclTaxes}
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            {editingProduct === p._id ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleUpdateProduct(p._id)}
                                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingProduct(null);
                                    setEditForm({
                                      title: "",
                                      PriceInclTaxes: "",
                                      Categories: "",
                                      PharmaCompany: "",
                                      Drugdetails: "",
                                      DateofMfg: "",
                                      DateofExp: "",
                                    });
                                  }}
                                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEditClick(p)}
                                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p._id, p.title)}
                                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">Order ID</th>
                    <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left p-4 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id} className="border-t">
                      <td className="p-4">{o._id}</td>
                      <td className="p-4">{o.customerName}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Activity Log</h1>
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activity.length === 0 ? (
                <p className="text-gray-500">No activity yet</p>
              ) : (
                <ul className="space-y-3">
                  {activity.map((a, i) => (
                    <li
                      key={i}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        a.type === "delete"
                          ? "bg-red-50 text-red-700"
                          : a.type === "update"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      <div className="flex-1">
                        <span className="font-medium">{a.product}</span>
                        <span className="ml-2">{a.type}d</span>
                        <span className="text-sm text-gray-500 ml-2">at {a.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
