import moment from 'moment';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';

import IProductDomain from '../../Domain/Entities/IProductDomain';
import IProductTransformer from './IProductTransformer';
import UserMinimalDataTransformer from '../../../User/Presentation/Transformers/UserMinimalDataTransformer';

class ProductTransformer extends Transformer
{
    private userTransformer: UserMinimalDataTransformer;

    constructor()
    {
        super();
        this.userTransformer = new UserMinimalDataTransformer();
    }

    public async transform(item: IProductDomain): Promise<IProductTransformer>
    {
        const createdBy = item.getCreatedBy();
        const lastModifiedBy = item.getLastModifiedBy();

        return {
            id: item.getId(),
            name: item.name,
            category: item.category,
            amount: item.amount,
            color: item.color,
            createdBy: createdBy ? await this.userTransformer.handle(createdBy) : null,
            lastModifiedBy: lastModifiedBy ? await this.userTransformer.handle(lastModifiedBy) : null,
            createdAt: moment(item.createdAt).utc().unix(),
            updatedAt: moment(item.updatedAt).utc().unix()
        };
    }
}

export default ProductTransformer;
