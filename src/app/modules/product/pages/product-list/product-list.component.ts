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
import {CatalogSortingFields, CatalogSortingModel} from '../../../../models/catalog-sorting.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  paginationOptions: PaginationModel = null;
  catalogFilterOptions: CatalogFiltersModel = null;

  catalogSortingFields = CatalogSortingFields;
  activeCatalogSorting = 'name';
  sorterPanelVisibility = false;

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
      const priceRange = queryParams.price ? queryParams.price.split(':') : null;
      this.catalogFilterOptions = {
        brands: queryParams.brands?.split(',').map(brandId => +brandId) || [],
        models: queryParams.models?.split(',').map(modelId => +modelId) || [],
        category: queryParams.category || null,
        priceRange: {
          currency: this.store.selectSnapshot(BaseState.activeCurrency).name,
          vatIncluded: !!+this.store.selectSnapshot(SettingState.settings)['productsWithKdv'],
          min: priceRange && priceRange[0] !== 'null' ? priceRange[0] : null,
          max: priceRange && priceRange[1] !== 'null' ? priceRange[1] : null
        },
        searchTerm: queryParams.search || null
      };
      this.activeCatalogSorting = queryParams?.sort || 'name';
      this.fetchProductList();
    });
  }

  fetchProductList(): void {
    this.productService.subscriber(
      this.productService.productList(
        this.paginationOptions,
        this.catalogFilterOptions,
        new CatalogSortingModel(this.catalogSortingFields[this.activeCatalogSorting].field, this.activeCatalogSorting.startsWith('-') ? 'DESC' : 'ASC')
      ),
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
    this.store.dispatch(new Navigate(['product/list'], {
      page: 1,
      ...this.normalizeOptions()
    }));
  }

  toggleSorterPanelVisibility(): void {
    this.sorterPanelVisibility = !this.sorterPanelVisibility;
  }

  changeSort(sorting: string): void {
    this.activeCatalogSorting = sorting;
    this.store.dispatch(new Navigate(['product/list'], {
      page: 1,
      ...this.normalizeOptions()
    }));
  }

  normalizeOptions(): any {
    const options: any = {...this.catalogFilterOptions, ...{sort: this.activeCatalogSorting}};
    options.brands = options.brands.join(',');
    options.models = options.models.join(',');
    if (options.priceRange) {
      options.price = (options.priceRange.min && options.priceRange.min !== 'null' ? options.priceRange.min : 'null') +
        ':' + (options.priceRange.max && options.priceRange.max !== 'null' ? options.priceRange.max : 'null');
    }
    options.search = options.searchTerm;
    delete options.priceRange;
    delete options.searchTerm;
    return Object.keys(options)
      .filter((k) => options[k])
      .reduce((a, k) => ({...a, [k]: options[k]}), {});
  }
}
