import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ProductRepPayload from './ProductRepPayload';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';

interface IProductUpdatePayload extends IdPayload, ProductRepPayload
{
    authUser: IUserDomain;
}

export default IProductUpdatePayload;
