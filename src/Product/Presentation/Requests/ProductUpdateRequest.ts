import { Mixin } from 'ts-mixer';
import IProductUpdatePayload from '../../Domain/Payloads/IProductUpdatePayload';
import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import IUserDomain from 'User/Domain/Entities/IUserDomain';
import ProductRepRequest from './ProductRepRequest';

class ProductUpdateRequest extends Mixin(ProductRepRequest, IdRequest) implements IProductUpdatePayload
{
    private readonly _authUser: IUserDomain;

    constructor(data: Record<string, any>)
    {
        super(data);
        this._id = data.id;
        this._authUser = data.authUser;
    }

    get authUser(): IUserDomain
    {
        return this._authUser;
    }
}

export default ProductUpdateRequest;
