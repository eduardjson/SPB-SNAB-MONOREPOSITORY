"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.EstimateItemScalarFieldEnum = exports.EstimateScalarFieldEnum = exports.ProjectDocumentScalarFieldEnum = exports.ProjectImageScalarFieldEnum = exports.ProjectScalarFieldEnum = exports.ShipmentItemScalarFieldEnum = exports.ShipmentScalarFieldEnum = exports.ObjectScalarFieldEnum = exports.StockItemScalarFieldEnum = exports.WarehouseScalarFieldEnum = exports.AttachmentScalarFieldEnum = exports.MessageScalarFieldEnum = exports.ProductImageScalarFieldEnum = exports.ProductScalarFieldEnum = exports.TokenScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.5.0",
    engine: "280c870be64f457428992c43c1f6d557fab6e29e"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Token: 'Token',
    Product: 'Product',
    ProductImage: 'ProductImage',
    Message: 'Message',
    Attachment: 'Attachment',
    Warehouse: 'Warehouse',
    StockItem: 'StockItem',
    Object: 'Object',
    Shipment: 'Shipment',
    ShipmentItem: 'ShipmentItem',
    Project: 'Project',
    ProjectImage: 'ProjectImage',
    ProjectDocument: 'ProjectDocument',
    Estimate: 'Estimate',
    EstimateItem: 'EstimateItem'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    username: 'username',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role',
    email: 'email',
    phone: 'phone',
    age: 'age',
    address: 'address',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TokenScalarFieldEnum = {
    token: 'token',
    expires: 'expires',
    userId: 'userId'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    category: 'category',
    manufacturer: 'manufacturer',
    imageUrl: 'imageUrl',
    unit: 'unit'
};
exports.ProductImageScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    url: 'url'
};
exports.MessageScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    userName: 'userName',
    text: 'text',
    createdAt: 'createdAt'
};
exports.AttachmentScalarFieldEnum = {
    id: 'id',
    messageId: 'messageId',
    fileName: 'fileName',
    fileSize: 'fileSize',
    fileType: 'fileType',
    filePath: 'filePath',
    uploadedAt: 'uploadedAt'
};
exports.WarehouseScalarFieldEnum = {
    id: 'id',
    name: 'name',
    address: 'address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.StockItemScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    warehouseId: 'warehouseId',
    quantity: 'quantity',
    purchasePrice: 'purchasePrice',
    estimatePrice: 'estimatePrice',
    salePrice: 'salePrice',
    discount: 'discount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ObjectScalarFieldEnum = {
    id: 'id',
    name: 'name',
    address: 'address',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ShipmentScalarFieldEnum = {
    id: 'id',
    warehouseId: 'warehouseId',
    objectId: 'objectId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ShipmentItemScalarFieldEnum = {
    id: 'id',
    shipmentId: 'shipmentId',
    productId: 'productId',
    quantity: 'quantity',
    createdAt: 'createdAt'
};
exports.ProjectScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    status: 'status'
};
exports.ProjectImageScalarFieldEnum = {
    id: 'id',
    projectId: 'projectId',
    data: 'data',
    filename: 'filename',
    mimeType: 'mimeType',
    size: 'size',
    createdAt: 'createdAt',
    sortOrder: 'sortOrder'
};
exports.ProjectDocumentScalarFieldEnum = {
    id: 'id',
    projectId: 'projectId',
    data: 'data',
    filename: 'filename',
    mimeType: 'mimeType',
    size: 'size',
    createdAt: 'createdAt',
    docType: 'docType'
};
exports.EstimateScalarFieldEnum = {
    id: 'id',
    projectId: 'projectId',
    totalCost: 'totalCost',
    laborCost: 'laborCost',
    materialsCost: 'materialsCost',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EstimateItemScalarFieldEnum = {
    id: 'id',
    estimateId: 'estimateId',
    productId: 'productId',
    name: 'name',
    description: 'description',
    quantity: 'quantity',
    unit: 'unit',
    price: 'price',
    total: 'total',
    costType: 'costType'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map