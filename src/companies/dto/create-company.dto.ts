export class CreateCompanyDto {
  companyName: string;
  companyMobileNumber: string;
  companyNature?: string;
  address: {
    governorate?: string;
    street?: string;
    area?: string;
    buildingNumber?: string;
    near?: string;
    floor?: string;
    officeNumber?: string;
  };
  jobPosition: [];
  ageRange: {
    from?: string;
    to?: string;
  };
  nationality?: string;
  education: {
    highSchool?: boolean;
    diploma?: boolean;
    bachelor?: boolean;
    master?: boolean;
    notRequired?: boolean;
  };
  fieldWork?: string;
  preferredConditions?: string;
  commission: {
    exists?: boolean;
    percentage?: string;
  };
  incentives?: boolean;
  overtime?: boolean;
  securedTransport?: boolean;
  healthInsurance?: boolean;
  socialSecurity?: boolean;
}
