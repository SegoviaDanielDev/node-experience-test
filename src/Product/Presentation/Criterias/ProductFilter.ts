import Filter from '../../../Shared/Presentation/Requests/Filter';

class ProductFilter extends Filter
{
    static readonly NAME: string = 'name';
    static readonly CATEGORY: string = 'category';
    static readonly AMOUNT: string = 'amount';
    static readonly COLOR: string = 'color';

    getFields(): any
    {
        return [
            ProductFilter.NAME,
            ProductFilter.AMOUNT

        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}

export default ProductFilter;
