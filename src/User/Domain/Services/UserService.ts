import IUserDomain from '../Entities/IUserDomain';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import CheckUserRolePayload from '../Payloads/CheckUserRolePayload';
import IRoleRepository from '../../../Role/Infrastructure/Repositories/IRoleRepository';
import Password from '../../../Shared/Domain/ValueObjects/Password';
import UniqueService from '../../../Shared/Domain/Services/UniqueService';
import MainConfig from '../../../Config/MainConfig';
import AuthHelper from '../../../Shared/Helpers/AuthHelper';
import ChangeMyPasswordPayload from '../Payloads/ChangeMyPasswordPayload';
import User from '../Entities/User';
import UserSavePayload from '../Payloads/UserSavePayload';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

class UserService
{
    private repository: IUserRepository;
    private roleRepository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.roleRepository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async create(payload: UserSavePayload)
    {
        const { minLength, maxLength } = MainConfig.getInstance().getConfig().validationSettings.password;

        const user = new User(payload);
        user.setPassword(await (new Password(payload.password, minLength, maxLength)).ready());

        await this.validate(user);
        await this.repository.save(user);

        return user;
    }

    async getOne(id: string): Promise<IUserDomain>
    {
        return await this.repository.getOne(id);
    }

    async validate(user: IUserDomain): Promise<void>
    {
        AuthHelper.validatePermissions(user.permissions);

        void await UniqueService.validate<IUserDomain>({
            repository: REPOSITORIES.IUserRepository,
            validate: {
                email: user.email,
                documentNumber: user.documentNumber
            },
            refValue: user.getId()
        });
    }

    async checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean>
    {
        const roles = payload.user.getRoles();

        roles.forEach((role) =>
        {
            if (role.slug === payload.roleToCheck)
            {
                return true;
            }
        });

        return false;
    }

    async updatePassword(user: IUserDomain, payload: ChangeMyPasswordPayload)
    {
        const { minLength, maxLength } = MainConfig.getInstance().getConfig().validationSettings.password;

        user.password = await (new Password(payload.password, minLength, maxLength)).ready();

        return await this.repository.update(user);
    }
}

export default UserService;
