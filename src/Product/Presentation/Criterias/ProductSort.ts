import Sort from '../../../Shared/Presentation/Requests/Sort';

class ProductSort extends Sort
{
    static readonly NAME: string = 'name';
    static readonly CATEGORY: string = 'category';
    static readonly AMOUNT: string = 'amount';
    static readonly COLOR: string = 'color';

    getFields(): any
    {
        return [
            ProductSort.NAME,
            ProductSort.CATEGORY,
            ProductSort.AMOUNT,
            ProductSort.COLOR
        ];
    }

    getDefaultSorts(): any
    {
        return [
            { [ProductSort.NAME]: 'asc' }
        ];
    }
}

export default ProductSort;
