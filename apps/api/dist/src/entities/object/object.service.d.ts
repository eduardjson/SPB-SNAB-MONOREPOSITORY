import { PrismaService } from "src/prisma";
import { CreateObjectDto } from "./dto/create-object.dto";
export declare class ObjectService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateObjectDto): Promise<string>;
    readOne(id: string): Promise<object>;
    readMany(): Promise<object[]>;
    update(id: string, dto: Partial<CreateObjectDto>): Promise<object>;
    delete(id: string): Promise<void>;
}
