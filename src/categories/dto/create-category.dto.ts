export class CreateCategoryDto {
  name: string;
  status: boolean; 
  description?: string;
  subCategory?: string[];
}
