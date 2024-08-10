import { Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { Categories } from '../schemas/categories.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private categoriesModel: Model<Categories>,
    private logger: Logger,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = new this.categoriesModel(createCategoryDto);
      this.logger.log(
        `Create Categories with this object: ${createCategoryDto}`,
      );
      const savingCategory = await createdCategory.save();
      return {
        success: true,
        message: 'Category created successfully',
        data: savingCategory,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return error;
    }
  }

  async findAll() {
    try {
      const categories = await this.categoriesModel.find({});

      return {
        success: true,
        message: 'All Categories',
        data: categories,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoriesModel.findById(id);
      return {
        success: true,
        message: 'Category',
        data: category,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.categoriesModel.findByIdAndUpdate(
        id,
        updateCategoryDto,
        { new: true },
      );
      return {
        success: true,
        message: 'Category updated successfully',
        data: updatedCategory,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return error;
    }
  }

  async remove(id: number) {
    try {
      const deletedCategory = await this.categoriesModel.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Category deleted successfully',
        data: deletedCategory,
      };
    } catch (error) {
      this.logger.error(`Error: ${error}`);
      return error;
    }
  }
}
