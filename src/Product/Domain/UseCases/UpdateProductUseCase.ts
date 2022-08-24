import IProductUpdatePayload from '../Payloads/IProductUpdatePayload';
import IProductDomain from '../Entities/IProductDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IProductRepository from '../../Infrastructure/Repositories/IProductRepository';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

class UpdateItemUseCase
{
    private repository: IProductRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
    }

    async handle(payload: IProductUpdatePayload): Promise<IProductDomain>
    {
        const item: IProductDomain = await this.repository.getOne(payload.id);
        item.updateBuild(payload);
        item.lastModifiedBy = payload.authUser;

        return await this.repository.update(item);
    }
}

export default UpdateItemUseCase;
