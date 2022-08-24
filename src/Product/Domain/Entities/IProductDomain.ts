import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import IProductUpdatePayload from '../Payloads/IProductUpdatePayload';

interface IProductDomain extends IBaseDomain
{
    name: string;
    category: string;
    amount: number;
    color: string;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

    getCreatedBy(): IUserDomain;
    getLastModifiedBy(): IUserDomain;
    updateBuild(payload: IProductUpdatePayload): void;
}

export default IProductDomain;
