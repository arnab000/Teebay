import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { RentSystemModule } from './rent-system/rent-system.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return {
          cors: {
            origin: 'http://localhost:3000',
            credentials: true,


          },
          autoSchemaFile: join(
            process.cwd(),
            config.get<string>('SCHEMA_PATH'),

          ),
          sortSchema: true,
          playground: true,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    UserModule,
    CategoriesModule,
    RentSystemModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
