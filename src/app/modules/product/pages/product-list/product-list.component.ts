import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {PaginationModel} from '../../../../models/pagination.model';
import {CatalogFiltersModel} from '../../../../models/catalog-filters.model';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {ActivatedRoute} from '@angular/router';
import {PaginatedModel} from '../../../../models/paginated.model';
import {ProductModel} from '../../../../models/product/product.model';
import {BrandModel} from '../../../../models/product/brand.model';
import {ModelModel} from '../../../../models/product/model.model';
import {CategoryModel} from '../../../../models/product/category.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  paginationOptions: PaginationModel = null;
  catalogFilterOptions: CatalogFiltersModel = null;

  productListResult: {
    products: PaginatedModel<ProductModel>,
    brands: BrandModel[],
    models: ModelModel[],
    categories: CategoryModel[]
  } = null;

  brands: {
    [brand: string]: boolean;
  } = {};

  models: {
    [model: string]: boolean;
  } = {};

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      console.log(queryParams);
      this.paginationOptions = {
        page: +queryParams?.page || 1,
        limit: 20
      };
      this.catalogFilterOptions = {
        brands: queryParams.brands?.split(',').map(brandId => +brandId) || [],
        models: queryParams.models?.split(',').map(modelId => +modelId) || [],
        category: queryParams.category || null
      };
      this.fetchProductList();
    });
  }

  fetchProductList(): void {
    this.productService.subscriber(
      this.productService.productList(this.paginationOptions, this.catalogFilterOptions),
      (result) => {
        this.productListResult = {...result};
        this.setBrands();
        this.setModels();
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  setBrands(): void {
    this.brands = {};
    this.catalogFilterOptions.brands = this.catalogFilterOptions.brands.filter(brand => this.productListResult.brands.some(_brand => +_brand.id === brand));
    this.productListResult.brands.forEach((brand) => {
      this.brands[brand.id] = this.catalogFilterOptions.brands.includes(+brand.id) || false;
    });
  }

  setModels(): void {
    this.models = {};
    this.productListResult.models.forEach((model) => {
      this.models[model.id] = this.catalogFilterOptions.models.includes(+model.id) || false;
    });
  }

  onBrandFilterChange(brandId: number): void {
    const checkIsExist = this.catalogFilterOptions.brands.includes(brandId);
    if (checkIsExist) {
      this.catalogFilterOptions.brands = this.catalogFilterOptions.brands.filter(brand => brand !== brandId);
    } else {
      this.catalogFilterOptions.brands.push(brandId);
    }
    this.catalogFilterOptions.models = [];
    this.store.dispatch(new Navigate(['product/list'], {
      page: 1,
      ...this.normalizeOptions()
    }));
  }

  onModelFilterChange(modelId: number): void {
    const checkIsExist = this.catalogFilterOptions.models.includes(modelId);
    if (checkIsExist) {
      this.catalogFilterOptions.models = this.catalogFilterOptions.models.filter(model => model !== modelId);
    } else {
      this.catalogFilterOptions.models.push(modelId);
    }
    this.store.dispatch(new Navigate(['product/list'], {
      page: 1,
      ...this.normalizeOptions()
    }));
  }

  onPageChange(page: number): void {
    this.store.dispatch(new Navigate(['product/list'], {
      page,
      ...this.normalizeOptions()
    }));
  }

  onCategoryFilterChange(categoryId: number): void {
    this.catalogFilterOptions.category = categoryId;
    this.store.dispatch(new Navigate(['product/list'], {
      page: 1,
      ...this.normalizeOptions()
    }));
  }

  normalizeOptions(): any {
    const options: any = {...this.catalogFilterOptions};
    options.brands = options.brands.join(',');
    options.models = options.models.join(',');
    return Object.keys(options)
      .filter((k) => options[k])
      .reduce((a, k) => ({...a, [k]: options[k]}), {});
  }
}
