import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto/create-object.dto';
export declare class ObjectController {
    private readonly service;
    constructor(service: ObjectService);
    readMany(): Promise<object[]>;
    readOne(id: string): Promise<object>;
    create(dto: CreateObjectDto): Promise<string>;
    update(id: string, dto: Partial<CreateObjectDto>): Promise<object>;
    delete(id: string): Promise<void>;
}
