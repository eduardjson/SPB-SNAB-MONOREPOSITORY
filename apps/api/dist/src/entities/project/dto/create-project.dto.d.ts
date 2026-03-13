import { EstimateDto } from './estimate.dto';
export declare class CreateProjectDto {
    name: string;
    description?: string;
    images?: Express.Multer.File[];
    documents?: Express.Multer.File[];
    estimate?: EstimateDto;
}
