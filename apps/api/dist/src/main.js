"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cors_options_config_1 = require("./config/cors-options.config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = process.env.PORT ?? 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
    }));
    app.use((req, res, next) => {
        console.log('Body:', req.body);
        next();
    });
    app.enableCors(cors_options_config_1.corsOptions);
    await app.listen(PORT);
    common_1.Logger.log(`Server started on port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map