import { Injectable, Logger } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Companies } from '../schemas/companies.schema';
import { Model } from 'mongoose';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Companies.name)
    private companiesFormModel: Model<Companies>,
    private logger: Logger,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const createdCompany = new this.companiesFormModel(createCompanyDto);

      const savingCompany = await createdCompany.save();
      return {
        success: true,
        message: 'Company created successfully',
        data: savingCompany,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return {
        success: false,
        message: 'Error in creating company',
        error,
      };
    }
  }

  async findAll() {
    try {
      const companies = await this.companiesFormModel.find();
      return {
        success: true,
        message: 'Companies fetched successfully',
        data: companies,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return {
        success: false,
        message: 'Error in fetching companies',
        error,
      };
    }
  }

  async findOne(id: number) {
    try {
      const company = await this.companiesFormModel.findById(id);
      return {
        success: true,
        message: 'Company fetched successfully',
        data: company,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return {
        success: false,
        message: 'Error in fetching company',
        error,
      };
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const updatedCompany = await this.companiesFormModel.findByIdAndUpdate(
        id,
        updateCompanyDto,
        {
          new: true,
        },
      );
      return {
        success: true,
        message: 'Company updated successfully',
        data: updatedCompany,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return {
        success: false,
        message: 'Error in updating company',
        error,
      };
    }
  }

  async remove(id: number) {
    try {
      const deletedCompany =
        await this.companiesFormModel.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Company deleted successfully',
        data: deletedCompany,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return {
        success: false,
        message: 'Error in deleting company',
        error,
      };
    }
  }
}
