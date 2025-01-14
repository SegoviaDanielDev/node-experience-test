import { IsString } from 'class-validator';

import ChangeForgotPasswordPayload from '../../Domain/Payloads/ChangeForgotPasswordPayload';
import UserPasswordRequest from '../../../User/Presentation/Requests/UserPasswordRequest';

class ChangeForgotPasswordRequest extends UserPasswordRequest implements ChangeForgotPasswordPayload
{
    private readonly _confirmationToken: string;

    constructor(data: Record<string, any>)
    {
        super(data);
        this._confirmationToken = data.confirmationToken;
    }

    @IsString()
    get confirmationToken(): string
    {
        return `Bearer ${this._confirmationToken}`;
    }
}

export default ChangeForgotPasswordRequest;
