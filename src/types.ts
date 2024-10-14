export interface Candy {
  id: number;
  name: string;
  sugarContent: number;
  description: string;
  image: string;
}

export type SortOption = 'name' | 'sugarContent';