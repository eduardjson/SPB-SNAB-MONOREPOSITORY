import { StreamableFile } from '@nestjs/common';
import express from 'express';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(dto: any, files: {
        images?: Express.Multer.File[];
        documents?: Express.Multer.File[];
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        status: import("../../../generated/prisma/enums").ProjectStatus;
    }>;
    findAll(): Promise<({
        _count: {
            images: number;
            documents: number;
        };
        images: {
            id: string;
            filename: string;
            mimeType: string;
            size: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        status: import("../../../generated/prisma/enums").ProjectStatus;
    })[]>;
    findOne(id: string): Promise<{
        estimate: ({
            items: {
                id: string;
                name: string;
                description: string | null;
                unit: string;
                productId: string | null;
                quantity: number;
                price: number;
                costType: import("../../../generated/prisma/enums").CostType;
                estimateId: string;
                total: number;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            laborCost: number | null;
            projectId: string;
            totalCost: number;
            materialsCost: number | null;
        }) | null;
        images: {
            id: string;
            filename: string;
            mimeType: string;
            size: number;
            sortOrder: number;
        }[];
        documents: {
            id: string;
            createdAt: Date;
            filename: string;
            mimeType: string;
            size: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        status: import("../../../generated/prisma/enums").ProjectStatus;
    }>;
    update(id: string, dto: UpdateProjectDto, files: {
        images?: Express.Multer.File[];
        documents?: Express.Multer.File[];
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        status: import("../../../generated/prisma/enums").ProjectStatus;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getImage(id: string, res: express.Response): Promise<void>;
    getImageBlob(id: string): Promise<StreamableFile>;
    getDocument(id: string, res: express.Response): Promise<void>;
    getDocumentBlob(id: string): Promise<StreamableFile>;
    deleteImage(id: string): Promise<{
        message: string;
    }>;
    deleteDocument(id: string): Promise<{
        message: string;
    }>;
}
