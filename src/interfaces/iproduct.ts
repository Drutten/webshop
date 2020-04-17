export default interface IProduct {
    name: string;
    id: number;
    description: string;
    imageUrl: string;
    price: number;
    year: string;
    productCategory: IProductCategory[];
}

export interface IProductCategory {
    categoryId: number;
    category: null;
}