import { Logger, Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmployeeForm,
  EmployeeFormSchema,
} from '../schemas/employeeForm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmployeeForm.name, schema: EmployeeFormSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, Logger],
})
export class EmployeeModule {}
