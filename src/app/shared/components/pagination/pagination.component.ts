import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges {
  @Input() page: number;
  @Input() pages: number;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  private totalPageCount = 11;
  private leftPageCount = 5;
  private rightPageCount = 7;

  public paginationContent: string[] = [];

  ngOnChanges(): void {
    this.paginationContent = [];
    if (this.pages < this.totalPageCount) {
      for (let i = 1; i <= this.pages; i++) {
        this.paginationContent.push(i.toString());
      }
    } else {
      if (this.page <= this.leftPageCount) {
        for (let i = 1; i <= this.rightPageCount; i++) {
          this.paginationContent.push(i.toString());
        }
        this.paginationContent.push('...');
        this.paginationContent.push(this.pages.toString());
      } else if (this.page >= (this.pages - this.leftPageCount)) {
        this.paginationContent.push('1');
        this.paginationContent.push('...');
        for (let i = this.pages - this.rightPageCount + 1; i <= this.pages; i++) {
          this.paginationContent.push(i.toString());
        }
      } else if (this.page > this.leftPageCount && this.page < (this.pages - this.leftPageCount)) {
        this.paginationContent.push('1');
        this.paginationContent.push('...');
        for (let i = -2; i <= 2; i++) {
          this.paginationContent.push((this.page + i).toString());
        }
        this.paginationContent.push('...');
        this.paginationContent.push(this.pages.toString());
      }
    }
  }

  onClick(page: number): void {
    if (!page || page === this.page) {
      return;
    }
    this.onPageChange.emit(page);
  }
}
