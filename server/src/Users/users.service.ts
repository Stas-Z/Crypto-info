import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { DataHasherService } from '@/utils/data-hasher.service'

import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schema/user.schema'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly passwordHasher: DataHasherService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, email } = createUserDto

        const hashedPassword = await this.passwordHasher.hashData(password)

        const newUser = new this.userModel({
            email,
            password: hashedPassword,
        })
        const savedUser = await newUser.save()

        return savedUser.toJSON()
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find()
    }

    async findById(id: Types.ObjectId): Promise<User | null> {
        return this.userModel.findById(id)
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email: email.toLowerCase() })
    }

    async remove(id: Types.ObjectId): Promise<void> {
        return this.userModel.findByIdAndDelete(id)
    }

    async updateUser(id: Types.ObjectId, data: Partial<User>) {
        return this.userModel.updateOne({ _id: id }, { $set: data })
    }
}
