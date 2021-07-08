export enum CatalogSortingField {
  PRODUCT_NAME = 'PRODUCT_NAME',
  PRODUCT_PRICE = 'PRODUCT_PRICE',
  PRODUCT_QUANTITY = 'PRODUCT_QUANTITY',
  PRODUCT_BRAND = 'PRODUCT_BRAND'
}

export const CatalogSortingFields: {
  [field: string]: CatalogSortingWithTranslate
} = {
  ['name']: {
    translate: 'BY_NAME_A_Z',
    field: CatalogSortingField.PRODUCT_NAME,
    order: 'ASC'
  },
  ['-name']: {
    translate: 'BY_NAME_Z_A',
    field: CatalogSortingField.PRODUCT_NAME,
    order: 'DESC'
  },
  ['price']: {
    translate: 'INCREASING_BY_PRICE',
    field: CatalogSortingField.PRODUCT_PRICE,
    order: 'ASC'
  },
  ['-price']: {
    translate: 'DECREASING_BY_PRICE',
    field: CatalogSortingField.PRODUCT_PRICE,
    order: 'DESC'
  },
  ['quantity']: {
    translate: 'INCREASING_BY_QUANTITY',
    field: CatalogSortingField.PRODUCT_QUANTITY,
    order: 'ASC'
  },
  ['-quantity']: {
    translate: 'DECREASING_BY_QUANTITY',
    field: CatalogSortingField.PRODUCT_QUANTITY,
    order: 'DESC'
  },
  ['brand']: {
    translate: 'BY_BRAND_A_Z',
    field: CatalogSortingField.PRODUCT_BRAND,
    order: 'ASC'
  },
  ['-brand']: {
    translate: 'BY_BRAND_Z_A',
    field: CatalogSortingField.PRODUCT_BRAND,
    order: 'DESC'
  }
};

export class CatalogSortingModel {
  field: CatalogSortingField | string;
  order: 'ASC' | 'DESC';

  constructor(field: CatalogSortingField | string, order: 'ASC' | 'DESC') {
    this.field = field;
    this.order = order;
  }
}

export class CatalogSortingWithTranslate extends CatalogSortingModel {
  translate: string;
}
