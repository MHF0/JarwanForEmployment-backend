import { Injectable, Logger } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeForm } from 'src/schemas/employeeForm.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(EmployeeForm.name)
    private employeeFormModel: Model<EmployeeForm>,
    private logger: Logger,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const createdEmployee = new this.employeeFormModel(createEmployeeDto);

      const savingEmployee = await createdEmployee.save();
      return {
        success: true,
        message: 'Employee created successfully',
        data: savingEmployee,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return error;
    }
  }

  async findAll(limit: number, filterCity?: string, filterCategory?: string) {
    try {
      // Fetch the total count of employees
      const totalCount = await this.employeeFormModel.countDocuments();

      // Determine if you want "AND" or "OR" condition
      let useOrCondition = true; // Set this dynamically based on your requirements
      let query = {};

      if (!filterCity && !filterCategory) {
        query = {};
      }

      // Build the query conditionally
      else
        query = useOrCondition
          ? { $or: [{ city: filterCity }, { category: filterCategory }] }
          : { city: filterCity, category: filterCategory };

      // Fetch employees with pagination (limit)

      const employees = await this.employeeFormModel.find(query).limit(limit);

      return {
        success: true,
        message: 'Employees fetched successfully',
        data: employees,
        totalCount, // Return total count of employees
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return {
        success: false,
        message: 'Error fetching employees',
        error: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const employee = await this.employeeFormModel.findById(id);
      return {
        success: true,
        message: 'Employee fetched successfully',
        data: employee,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return error;
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const updatedEmployee = await this.employeeFormModel.findByIdAndUpdate(
        id,
        updateEmployeeDto,
        {
          new: true,
        },
      );
      return {
        success: true,
        message: 'Employee updated successfully',
        data: updatedEmployee,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return error;
    }
  }

  async remove(id: number) {
    try {
      const deletedEmployee =
        await this.employeeFormModel.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Employee deleted successfully',
        data: deletedEmployee,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return error;
    }
  }
}
