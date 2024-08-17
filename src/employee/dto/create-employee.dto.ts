export class CreateEmployeeDto {
  category: string;
  subCategory?: string;
  fullName: string;
  city: string;
  description?: string;
  phoneNumber: string;
  cv?: string;
  acceptPolicy: boolean;
}
