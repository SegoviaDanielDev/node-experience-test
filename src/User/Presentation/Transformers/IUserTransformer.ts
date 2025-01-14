import IRoleTransformer from '../../../Role/Presentation/Transformers/IRoleTransformer';
import BaseTransformer, { BasePropertiesTransformer } from '../../../Shared/Presentation/Transformers/BaseTransformer';
import IUserDomain from '../../Domain/Entities/IUserDomain';

type IUserTransformer = BaseTransformer<IUserDomain> & BasePropertiesTransformer &
{
    roles: IRoleTransformer[];
}

export default IUserTransformer;
