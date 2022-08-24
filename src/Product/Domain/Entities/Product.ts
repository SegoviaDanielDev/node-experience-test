import IProductDomain from './IProductDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import ProductRepPayload from '../Payloads/ProductRepPayload';

class Product extends Base implements IProductDomain
{
    name: string;
    category: string;
    amount: number;
    color: string;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

    constructor(payload: ProductRepPayload)
    {
        super();
        this.updateBuild(payload);
    }

    updateBuild(payload: ProductRepPayload): void
    {
        this.name = payload.name;
        this.category = payload.category;
        this.amount = payload.amount;
        this.color = payload.color;
    }

    getCreatedBy(): IUserDomain
    {
        return this.createdBy;
    }

    getLastModifiedBy(): IUserDomain
    {
        return this.lastModifiedBy;
    }
}

export default Product;
