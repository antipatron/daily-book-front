import {ProviderProductsDto} from "./provider-products.dto";

export class ProductDetailDto {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  brandId?: number;
  ivaId?: number;
  companyId?: number;
  productDetail?: ProviderProductsDto;
}
