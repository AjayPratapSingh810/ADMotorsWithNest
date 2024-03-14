import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ajay:ajay@cluster0.zsiho0c.mongodb.net/',{
      dbName:"ADMotorsNest"
    }),
    JwtModule.register({
      secret: 'your_secret_key', // Change this to your actual secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
