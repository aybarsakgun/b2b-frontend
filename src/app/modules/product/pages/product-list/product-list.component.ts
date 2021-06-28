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
import {BaseState} from '../../../../store/states/base/base.state';
import {SettingState} from '../../../../store/states/setting/setting.state';

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

  priceRange: {
    min: string,
    max: string
  } = {
    min: null,
    max: null
  };

  parentCategory: CategoryModel = null;
  flattenCategories: CategoryModel[] = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    const flatCategories = (categories: CategoryModel[], flattenArray: CategoryModel[] = []) => {
      categories.forEach((category) => {
        flattenArray.push(category);
        if (category.children.length) {
          return flatCategories(category.children, flattenArray);
        }
      });
      return flattenArray;
    };
    this.flattenCategories = flatCategories(this.store.selectSnapshot(BaseState.categories));
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      console.log(queryParams);
      this.paginationOptions = {
        page: +queryParams?.page || 1,
        limit: 20
      };
      this.catalogFilterOptions = {
        brands: queryParams.brands?.split(',').map(brandId => +brandId) || [],
        models: queryParams.models?.split(',').map(modelId => +modelId) || [],
        category: queryParams.category || null,
        priceRange: queryParams.price ? {
          currency: this.store.selectSnapshot(BaseState.activeCurrency).name,
          vatIncluded: !!+this.store.selectSnapshot(SettingState.settings)['productsWithKdv'],
          min: queryParams.price?.split(':')[0] ?? null,
          max: queryParams.price?.split(':')[1] ?? null
        } : null
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
        // TODO: Improvements are needed.
        this.parentCategory = result.categories?.[0]?.parent;
        // const findParentCategory = this.flattenCategories.find(category => category.id === this.catalogFilterOptions?.category)?.parent;
        // this.parentCategory = findParentCategory;
        // console.log(findParentCategory);

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

  filterByPriceRange(): void {
    this.catalogFilterOptions.priceRange = {
      ...this.catalogFilterOptions.priceRange,
      max: this.priceRange.max ?? null,
      min: this.priceRange.min ?? null
    };
    this.store.dispatch(new Navigate(['product/list'], {
      page: 1,
      ...this.normalizeOptions()
    }));
  }

  normalizeOptions(): any {
    const options: any = {...this.catalogFilterOptions};
    options.brands = options.brands.join(',');
    options.models = options.models.join(',');
    let priceRange = '';
    if (options.priceRange?.min) {
      priceRange += options.priceRange.min;
    }
    if (options.priceRange?.max) {
      priceRange += priceRange.length ? ':' + options.priceRange.max : '0:' + options.priceRange.max;
    }
    if (priceRange) {
      options.price = priceRange;
      delete options.priceRange;
    }
    return Object.keys(options)
      .filter((k) => options[k])
      .reduce((a, k) => ({...a, [k]: options[k]}), {});
  }
}
