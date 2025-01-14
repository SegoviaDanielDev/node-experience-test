import { IsString } from 'class-validator';
import jwt from 'jwt-simple';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ConfirmationTokenPayload from '../../Domain/Payloads/ConfirmationTokenPayload';
import MainConfig from '../../../Config/MainConfig';

class ConfirmationTokenRequest implements ConfirmationTokenPayload
{
    private readonly _payload: Record<string, any>;
    private readonly _secret: string;

    constructor(data: Record<string, any>)
    {
        const { iss, secret, aud } = MainConfig.getInstance().getConfig().jwt;
        const expires = dayjs().utc().add(5, 'minute').unix();

        this._secret = secret;
        this._payload = {
            iss,
            aud,
            sub: data.email,
            iat: expires,
            exp: expires,
            email: data.email
        };
    }

    @IsString()
    get confirmationToken(): string
    {
        return jwt.encode(this._payload, this._secret, 'HS512');
    }
}

export default ConfirmationTokenRequest;
