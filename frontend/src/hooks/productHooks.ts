import { useMutation, useQuery } from '@tanstack/react-query'
import { Product } from '../types/Product'
import apiClient from '../apiClient'

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () =>
      (
        await apiClient.get<{
        }>(`api/products`)
      ).data,
  })



export const useGetProductDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['products', id],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/${id}`)).data,
  })

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      // (await apiClient.get<[]>(`/api/products/categories`)).data,
      (await apiClient.get<[]>(`/api/categories`)).data,
  })





export const useGetAdminProdcutsQuery = (page: number) =>
  useQuery({
    queryKey: ['products', page],
    queryFn: async () =>
      (
        await apiClient.get<{
          products: [Product]
          page: number
          pages: number
        }>(`/api/products`)
      ).data,
  })

export const useCreateProductMutation = () =>
  useMutation({
    mutationFn: async () =>
      (
        await apiClient.post<{ product: Product; message: string }>(
          `api/products`
        )
      ).data,
  })
export const useDeleteProductMutation = () =>
  useMutation({
    mutationFn: async (productId: string) =>
      (await apiClient.delete(`api/products/${productId}`)).data,
  })

export const useUpdateProductMutation = () =>
  useMutation({
    mutationFn: async (product: {
      id: number
      name: string
      price: number
      category_id: number
      description: string
    }) =>
      (
        await apiClient.put<{ product: Product; message: string }>(
          `api/products/${product.id}`,
          product
        )
      ).data,
  })
