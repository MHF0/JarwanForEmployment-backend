import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { EmployeeModule } from './employee/employee.module';
import { CompaniesModule } from './companies/companies.module';
import { S3ServiceModule } from './s3-service/s3-service.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CategoriesModule,
    EmployeeModule,
    CompaniesModule,
    S3ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
