import ProductRepPayload from '../Payloads/ProductRepPayload';
import IProductDomain from '../Entities/IProductDomain';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import Product from '../Entities/Product';
import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../Infrastructure/Repositories/IProductRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

class SaveProductUseCase
{
    private repository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: ProductRepPayload, authUser: IUserDomain): Promise<IProductDomain>
    {
        const item = new Product(payload);
        item.createdBy = authUser;

        return await this.repository.save(item);
    }
}

export default SaveProductUseCase;
