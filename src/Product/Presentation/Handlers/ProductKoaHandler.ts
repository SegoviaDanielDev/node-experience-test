import Koa from 'koa';
import Router from 'koa-router';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import ProductController from '../Controllers/ProductController';
import ProductTransformer from '../Transformers/ProductTransformer';
import ProductRepRequest from '../Requests/ProductRepRequest';
import { AuthUser } from '../../../Auth/Presentation/Helpers/AuthUser';
import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import ProductRequestCriteria from '../Requests/ProductRequestCriteria';
import ProductUpdateRequest from '../Requests/ProductUpdateRequest';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/product'
};

const ProductKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller: ProductController = new ProductController();

ProductKoaHandler.post('/', AuthorizeKoaMiddleware(Permissions.ITEMS_SAVE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const request = new ProductRepRequest(ctx.request.body);

    const item = await controller.save(request, AuthUser(ctx));

    void await responder.send(item, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

ProductKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.ITEMS_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        url: ctx.request.url,
        query: ctx.request.query
    };

    const _request = new ProductRequestCriteria(data);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new ProductTransformer());
});

ProductKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_SHOW), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params);

    const item = await controller.getOne(_request);

    void await responder.send(item, ctx, StatusCode.HTTP_OK, new ProductTransformer());
});

ProductKoaHandler.put('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_UPDATE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data = {
        id: ctx.params.id,
        authUser: AuthUser(ctx),
        ...ctx.request.body
    };

    const _request = new ProductUpdateRequest(data);

    const item = await controller.update(_request);

    void await responder.send(item, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
});

ProductKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.ITEMS_DELETE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params);

    const item = await controller.remove(_request);

    void await responder.send(item, ctx, StatusCode.HTTP_OK, new ProductTransformer());
});

export default ProductKoaHandler;
