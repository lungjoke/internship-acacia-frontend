import { http } from './http.sevrice';

export async function findAllCategory() {
  return await http.get<any>(`/v1/categories`);
}

//create
export async function createCategory(category: any) {
  return await http.post<any>('/v1/categories', {
    name: category.name,
  });
}

//find one
export async function findOneCategory(id: number) {
  return await http.get<any>(`/v1/categories/${id}`);
}

//update by id
export async function updateCategory(id: number, category: any) {
  return await http.patch<any>(`/v1/categories/${id}`, {
    name: category.name,
  });
}

//remove by id
export async function removeCategory(id: number) {
  return await http.delete<any>(`/v1/categories/${id}`);
}
