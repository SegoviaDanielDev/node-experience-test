import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { ILoginResponse } from '../../Shared/InterfaceAdapters/Tests/ILogin';
import { IProductResponse, IListProductResponse } from './types';
import MainConfig from '../../Config/MainConfig';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';

describe('Start Product Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let token: string = null;
    let productId = '';
    let deleteResponse: any = null;

    beforeAll(async() =>
    {
        const configServer = await initTestServer();

        request = configServer.request;
        dbConnection = configServer.dbConnection;
    });

    afterAll((async() =>
    {
        await dbConnection.drop();
        await dbConnection.close();
    }));

    describe('Product Success', () =>
    {
        beforeAll(async() =>
        {
            const payload = {
                email: 'user@node.com',
                password: '12345678'
            };

            const response: ILoginResponse = await request
                .post('/api/auth/login?provider=local')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { data } } = response;

            token = data.token;
        });

        test('Add Product /product', async() =>
        {
            const payload = {
                name: 'Product1',
                category: 'lorem',
                amount: 10,
                color:'ffffff'
            };

            const response: IProductResponse = await request
                .post('/api/product')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);

            productId = data.id;
        });

        test('Get Product /products/:id', async() =>
        {
            const payload = {
                name: 'Product1'
            };

            const response: IProductResponse = await request
                .get(`/api/product/${productId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.name).toStrictEqual(payload.name);
            // expect(data.type).toStrictEqual(payload.type);
        });

        test('Update Product /items/:id', async() =>
        {
            const payload = {
                name: 'Product1',
                category: 'ipsum',
                amount: 10,
                color:'ffffff'
            };

            const response: IProductResponse = await request
                .put(`/api/product/${productId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
        });

        test('Delete Item /items/:id', async() =>
        {
            const payload = {
                name: 'Product1 for delete',
                category: 'lorem',
                amount: 10,
                color:'ffffff'
            };

            const createResponse: IProductResponse = await request
                .post('/api/product')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            deleteResponse = await request
                .delete(`/api/product/${createResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data } } = deleteResponse;

            expect(deleteResponse.statusCode).toStrictEqual(200);

            expect(data.name).toStrictEqual(payload.name);
            expect(data.category).toStrictEqual(payload.category);
            expect(data.amount).toStrictEqual(payload.amount);
            expect(data.color).toStrictEqual(payload.color);
        });

        // test('Get Products /product', async() =>
        // {
        //     const config = MainConfig.getInstance();
        //
        //     const response: IListProductResponse = await request
        //         .get('/api/product?pagination[offset]=0&pagination[limit]=5')
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send();
        //
        //     const { body: { data, pagination } } = response;
        //
        //     expect(response.statusCode).toStrictEqual(200);
        //     //
        //     // expect(data.length).toStrictEqual(5);
        //     // expect(pagination.total).toStrictEqual(11);
        //     // expect(pagination.perPage).toStrictEqual(5);
        //     // expect(pagination.currentPage).toStrictEqual(1);
        //     // expect(pagination.lastPage).toStrictEqual(3);
        //     // expect(pagination.from).toStrictEqual(0);
        //     // expect(pagination.to).toStrictEqual(5);
        //     expect(pagination.path).toContain(config.getConfig().url.urlApi);
        //     expect(pagination.firstUrl).toContain('/api/product?pagination[offset]=0&pagination[limit]=5');
        //     expect(pagination.lastUrl).toContain('/api/product?pagination[offset]=0&pagination[limit]=5');
        //     expect(pagination.nextUrl).toContain(null);
        //     expect(pagination.prevUrl).toStrictEqual(null);
        //     expect(pagination.currentUrl).toContain('/api/product?pagination[offset]=0&pagination[limit]=5');
        // });
        //
        // test('Get Product /product without pagination', async() =>
        // {
        //     const response: IListProductResponse = await request
        //         .get('/api/product')
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send();
        //
        //     const { body: { data, pagination } } = response;
        //
        //     expect(response.statusCode).toStrictEqual(200);
        //
        //     expect(data.length).toStrictEqual(11);
        //     expect(pagination).not.toBeDefined();
        // });

        test('Get Product /product with Filter Type', async() =>
        {
            const response: IListProductResponse = await request
                .get('/api/product?pagination[limit]=20&pagination[offset]=0&filter[amount]=10')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(1);
            expect(pagination.total).toStrictEqual(1);

            expect(data[0].amount).toStrictEqual(10);
        });

        // test('Get Items /items with Sort Desc Type', async() =>
        // {
        //     const response: IListProductResponse = await request
        //         .get('/api/items?pagination[limit]=20&pagination[offset]=0&sort[type]=desc')
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send();
        //
        //     const { body: { data: [item1, item2] } } = response;
        //
        //     expect(response.statusCode).toStrictEqual(200);
        //
        //     expect(item1.amount).toBeGreaterThanOrEqual(item2.amount);
        // });
    });

    describe('Product Fails', () =>
    {
        beforeAll(async() =>
        {
            const payload = {
                email: 'user@node.com',
                password: '12345678'
            };

            const response: ILoginResponse = await request
                .post('/api/auth/login?provider=local')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { data } } = response;

            token = data.token;
        });


        test('Add Product /Product', async() =>
        {
            const payload = {
                name: 'Item 2',
                category: 'lorem',
                amount: '10',
                color:'ffffff'
            };

            const response: IProductResponse = await request
                .post('/api/product')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('amount');
            expect(error.constraints.isInt).toStrictEqual('amount must be an integer number');
        });

        test('Get Product /product/:id', async() =>
        {
            const response: IProductResponse = await request
                .get(`/api/product/${productId}dasdasda123`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Failed Request.');

            expect(error.property).toStrictEqual('id');
            expect(error.constraints.isUuid).toBeDefined();
            expect(error.constraints.isUuid).toStrictEqual('id must be a UUID');
        });

        test('Update Product /product/:id', async() =>
        {
            const payload = {
                name: 11,
                category: 10,
                amount: '10',
                color: 10
            };

            const response: IProductResponse = await request
                .put(`/api/product/${productId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { message, errors: [errorName, errorCategory, errorAmount, errorColor] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Failed Request.');

            expect(errorName.property).toStrictEqual('name');
            expect(errorName.constraints.isString).toBeDefined();
            expect(errorName.constraints.isString).toStrictEqual('name must be a string');

            expect(errorCategory.property).toStrictEqual('category');
            expect(errorCategory.constraints.isString).toBeDefined();
            expect(errorCategory.constraints.isString).toStrictEqual('category must be a string');

            expect(errorAmount.property).toStrictEqual('amount');
            expect(errorAmount.constraints.isInt).toBeDefined();
            expect(errorAmount.constraints.isInt).toStrictEqual('amount must be an integer number');

            expect(errorColor.property).toStrictEqual('color');
            expect(errorColor.constraints.isString).toBeDefined();
            expect(errorColor.constraints.isString).toStrictEqual('color must be a string');
        });

        test('Delete product error /product/:id', async() =>
        {
            const deleteErrorResponse: IProductResponse = await request
                .delete(`/api/product/${deleteResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { message } } = deleteErrorResponse;

            expect(deleteErrorResponse.statusCode).toStrictEqual(400);
            expect(message).toStrictEqual('Product not found.');
        });
    });
});

