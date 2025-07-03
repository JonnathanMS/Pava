import {useMutation, useQuery} from '@tanstack/react-query';
import {Category} from '../types/Category';
import apiClient from '../apiClient';

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      (await apiClient.get<Category[]>(`/api/categories`)).data,
  });

export const useGetCategoryDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['categories', id],
    queryFn: async () =>
      (await apiClient.get<Category>(`/api/categories/${id}`)).data,
  });

export const useCreateCategoryMutation = () =>
  useMutation({
    mutationFn: async (category: Category) =>
      (
        await apiClient.post<{ category: Category; message: string }>(
          `api/categories`,
          category
        )
      ).data,
  });

export const useDeleteCategoryMutation = () =>
  useMutation({
    mutationFn: async (categoryId: string) =>
      (
        await apiClient.delete<{ message: string }>(`api/categories/${categoryId}`)
      ).data,
  });

export const useUpdateCategoryMutation = () =>
  useMutation({
    mutationFn: async (category: Category) =>
      (
        await apiClient.put<{ category: Category; message: string }>(
          `api/categories/${category.id}`,
          category
        )
      ).data,
  });