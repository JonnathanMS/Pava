import { useMutation, useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";
import apiClient from "../apiClient";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => (await apiClient.get<{}>(`api/products`)).data,
  });

export const useGetProductDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/${id}`)).data,
  });

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      // (await apiClient.get<[]>(`/api/products/categories`)).data,
      (await apiClient.get<[]>(`/api/categories`)).data,
  });

export const useCreateProductMutation = () =>
  useMutation({
    mutationFn: async (
      product: Product & {
        name: string;
        price: number;
        category_id: number;
        description: string;
      }
    ) =>
      (
        await apiClient.post<{ product: Product; message: string }>(
          `api/products`,
          product
        )
      ).data,
  });

export const useDeleteProductMutation = () =>
  useMutation({
    mutationFn: async (productId: string) =>
      (await apiClient.delete(`api/products/${productId}`)).data,
  });

export const useUpdateProductMutation = () =>
  useMutation({
    mutationFn: async (product:Product & {
      id: number;
      name: string;
      price: number;
      category_id: number;
      description: string;
    }) =>
      (
        await apiClient.put<{ product: Product; message: string }>(
          `api/products/${product.id}`,
          product
        )
      ).data,
  });
