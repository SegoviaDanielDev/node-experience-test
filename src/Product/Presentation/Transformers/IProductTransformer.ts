import IUserMinimalDataTransformer from '../../../User/Presentation/Transformers/IUserMinimalDataTransformer';

interface IProductTransformer
{
    id: string;
    name: string;
    category: string;
    amount: number;
    color: string;
    createdBy: IUserMinimalDataTransformer;
    lastModifiedBy: IUserMinimalDataTransformer;
    createdAt: number;
    updatedAt: number;
}

export default IProductTransformer;
