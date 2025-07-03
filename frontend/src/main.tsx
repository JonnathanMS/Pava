import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "./Store";
import App from "./App";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import CategoryListPage from "./pages/CategoryListPage";
import CreateProductPage from "./pages/CreateProductPage";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import EditProductPage from "./pages/EditProductPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="categories" element={<CategoryListPage />} />
        <Route path="createProduct" element={<CreateProductPage />} />
        <Route path="createCategory" element={<CreateCategoryPage />} />
        <Route path="editProduct/:id" element={<EditProductPage />} />
        <Route path="editCategory/:id" element={<EditCategoryPage />} />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
