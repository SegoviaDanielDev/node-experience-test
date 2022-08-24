import ProductRepPayload from '../../Domain/Payloads/ProductRepPayload';
import { IsInt, IsString } from 'class-validator';
import { decorate } from 'ts-mixer';

class ProductRepRequest implements ProductRepPayload
{
    private readonly _name: string;
    private readonly _category: string;
    private readonly _amount: number;
    private readonly _color: string;

    constructor(data: Record<string, any>)
    {
        this._name = data.name;
        this._category = data.category;
        this._amount = data.amount;
        this._color = data.color;
    }

    @decorate(IsString())
    get name(): string
    {
        return this._name;
    }

    @decorate(IsString())
    get category(): string
    {
        return this._category;
    }

    @decorate(IsInt())
    get amount(): number
    {
        return this._amount;
    }

    @decorate(IsString())
    get color(): string
    {
        return this._color;
    }
}

export default ProductRepRequest;
