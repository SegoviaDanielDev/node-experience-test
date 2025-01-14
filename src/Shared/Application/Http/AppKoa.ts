import cors from 'koa-cors';
import helmet from 'koa-helmet';
import { Server } from 'http';

import AuthenticationKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthenticationKoaMiddleware';
import RedirectRouteNotFoundKoaMiddleware from '../../Presentation/Middlewares/RedirectRouteNotFoundKoaMiddleware';
import ThrottleKoaMiddleware from '../../Presentation/Middlewares/ThrottleKoaMiddleware';
import VerifyTokenKoaMiddleware from '../../../Auth/Presentation/Middlewares/VerifyTokenKoaMiddleware';
import IApp from './IApp';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import IndexKoaHandler from '../../Presentation/Handlers/IndexKoaHandler';
import ItemKoaHandler from '../../../Item/Presentation/Handlers/ItemKoaHandler';
import RoleKoaHandler from '../../../Role/Presentation/Handlers/RoleKoaHandler';
import UserKoaHandler from '../../../User/Presentation/Handlers/UserKoaHandler';
import NotificationKoaHandler from '../../../Notification/Presentation/Handlers/NotificationKoaHandler';
import FileKoaHandler from '../../../File/Presentation/Handlers/FileKoaHandler';
import AuthKoaHandler from '../../../Auth/Presentation/Handlers/AuthKoaHandler';
import IAppConfig from './IAppConfig';
import WhiteListKoaHandler from '../../Tests/WhiteListKoaHandler';
import { ErrorKoaHandler } from './ErrorKoaHandler';
import MainConfig from '../../../Config/MainConfig';

import LoggerKoaMiddleware from '../../Presentation/Middlewares/LoggerKoaMiddleware';
import container from '../../../register';
import { createRequestContext, getRequestContext } from '../../Presentation/Shared/RequestContext';
import Logger from '../Logger/Logger';
import ContextMikroORMKoaMiddleware from '../../Presentation/Middlewares/ContextMikroORMKoaMiddleware';

class AppKoa implements IApp
{
    public port?: number;
    private app: Koa;
    private config: IAppConfig;
    private server: Server;

    public initConfig(config: IAppConfig)
    {
        this.port = config.serverPort || 8090;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.app = require('koa-qs')(new Koa());
        this.config = config;

        this.app.use(cors({
            credentials: true
        }));
        this.app.proxy = MainConfig.getInstance().getConfig().env === 'production';
        this.app.use(helmet());

        this.app.use(bodyParser({
            jsonLimit: '5mb'
        }));

        // Generic error handling middleware.
        this.app.use(ErrorKoaHandler.handle);

        if (MainConfig.getInstance().getConfig().dbConfig.default === 'MikroORM')
        {
            this.app.use(ContextMikroORMKoaMiddleware);
        }

        this.app.use(async(ctx, next) =>
        {
            ctx.container = container.createChildContainer();
            createRequestContext(ctx.container);

            await next();
        });
        this.app.use(LoggerKoaMiddleware);
        this.app.use(ThrottleKoaMiddleware);
        this.app.use(AuthenticationKoaMiddleware);
        this.app.use(VerifyTokenKoaMiddleware);
    }

    public async build(): Promise<void>
    {
        // Route middleware.
        this.app.use(IndexKoaHandler.routes());
        this.app.use(IndexKoaHandler.allowedMethods());

        this.app.use(WhiteListKoaHandler.routes());
        this.app.use(WhiteListKoaHandler.allowedMethods());

        this.app.use(ItemKoaHandler.routes());
        this.app.use(ItemKoaHandler.allowedMethods());

        this.app.use(RoleKoaHandler.routes());
        this.app.use(RoleKoaHandler.allowedMethods());

        this.app.use(UserKoaHandler.routes());
        this.app.use(UserKoaHandler.allowedMethods());

        this.app.use(NotificationKoaHandler.routes());
        this.app.use(NotificationKoaHandler.allowedMethods());

        this.app.use(FileKoaHandler.routes());
        this.app.use(FileKoaHandler.allowedMethods());

        this.app.use(AuthKoaHandler.routes());
        this.app.use(AuthKoaHandler.allowedMethods());

        this.app.use(async(ctx, next) =>
        {
            const data = getRequestContext();
            await data.container.dispose();
            delete data.container;

            await next();
        });
        this.app.use(RedirectRouteNotFoundKoaMiddleware);
    }

    public listen(): any
    {
        this.server = this.app.listen(this.port, () =>
        {
            Logger.info(`Koa is listening to http://localhost:${this.port}`);
        });

        return this.server;
    }

    public callback(): any
    {
        return this.app.callback();
    }

    close(): void
    {
        if (this.server)
        {
            this.server.close();
        }
    }
}

export default AppKoa;
