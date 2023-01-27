import IProduct from "./IProduct";

export default interface IProductList {
  totalItens: number;
  page: number,
  perPage: number,
  products: any
}
