import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface TableSandboxItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  inStock: boolean;
}

const EXAMPLE_DATA: TableSandboxItem[] = [
  {id: 1, name: 'Hydrogen', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida orci ac rutrum ornare. Mauris lacinia nisl non eros blandit placerat. Vivamus euismod turpis ut arcu accumsan, eget varius ligula venenatis. Sed eu faucibus nibh. Quisque eget odio vitae velit dapibus sodales. Mauris justo leo, scelerisque a consequat ut, semper vitae eros. Integer dolor massa, interdum quis enim et, tempor vestibulum eros. In hac habitasse platea dictumst. Sed non dui laoreet, rhoncus ex blandit, aliquet diam. Integer faucibus arcu in commodo semper.\n' +
      '\n' +
      'In hac habitasse platea dictumst. Duis purus massa, consequat eu orci vitae, tempor aliquam dui. Maecenas viverra leo at tempus feugiat. Praesent risus eros, tempus at eros eget, pharetra molestie neque. Vivamus eu elit a lacus aliquam mattis sed a justo. Donec feugiat metus vel egestas imperdiet. Etiam feugiat ipsum vel tempor fringilla. Vivamus risus massa, egestas nec felis sit amet, luctus faucibus felis. Quisque ac felis at lacus molestie semper vitae eu neque. Aenean tempus consectetur metus, id condimentum nulla ultricies et. Quisque congue dui eu quam sollicitudin, sit amet condimentum tortor luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas id tellus ac dui pharetra laoreet in quis felis. Ut a malesuada dolor. Vestibulum accumsan sapien et lorem placerat, et accumsan urna pulvinar. Ut sodales in diam vestibulum malesuada.\n' +
      '\n' +
      'Etiam fermentum orci nec magna ullamcorper, suscipit faucibus quam interdum. Aenean in egestas risus, eu mattis justo. Integer eget nulla neque. Aenean mollis lacus nec felis aliquam, sit amet scelerisque augue gravida. Mauris quis tempus lacus. Integer vitae blandit eros, ut finibus elit. Etiam vehicula felis et posuere pharetra. Sed volutpat sollicitudin est at rhoncus. Donec at volutpat orci. Phasellus et quam sit amet lectus cursus lobortis.\n' +
      '\n' +
      'Maecenas sed ante vitae purus tempor dictum. Quisque bibendum suscipit orci, sit amet venenatis justo accumsan et. Nam egestas placerat risus, sit amet pulvinar arcu malesuada imperdiet. Etiam dui massa, condimentum a porta vitae, iaculis id turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque quis urna urna. Donec finibus, neque non interdum elementum, nisl magna pretium sem, sit amet lobortis lectus eros vitae nisl. Vivamus hendrerit nisl vitae blandit laoreet. Nullam mollis felis a sapien pulvinar, nec rhoncus dolor faucibus. Pellentesque ipsum purus, ultrices eu augue pretium, vulputate fermentum mauris. Mauris tincidunt tellus at accumsan malesuada. Phasellus porttitor, urna eu eleifend finibus, orci massa porttitor augue, at vulputate velit quam ut ligula. Praesent congue tempor augue, eu vestibulum ligula fermentum aliquam. Quisque vel rhoncus dui.\n' +
      '\n' +
      'Vivamus at condimentum odio. Suspendisse efficitur imperdiet libero, id commodo ipsum commodo in. Nullam faucibus sodales metus non faucibus. Mauris felis lacus, aliquam nec nisi vel, imperdiet scelerisque diam. Suspendisse tincidunt consequat quam, eget ullamcorper tellus ultrices sit amet. Proin aliquam nulla eu nulla semper, vel vestibulum diam convallis. Cras non mauris sapien. Duis venenatis, odio vitae finibus egestas, quam odio auctor ligula, non consequat sapien neque suscipit risus. Quisque semper tempus congue. Ut malesuada turpis vel sagittis viverra. Etiam commodo augue eu scelerisque rutrum. Etiam quis varius eros. Sed imperdiet aliquet dui quis rhoncus. Integer eget tellus lorem. Nam metus erat, ultricies vitae risus nec, mollis dapibus nisl.', category: 'Element', price: 1.00, inStock: true},
  {id: 2, name: 'Helium', description: 'A colorless, odorless, tasteless, non-toxic, inert, monatomic gas', category: 'Element', price: 2.00, inStock: true},
  {id: 3, name: 'Lithium', description: 'A soft, silvery-white alkali metal', category: 'Element', price: 3.00, inStock: false},
  {id: 4, name: 'Beryllium', description: 'A hard, grayish metal naturally found in mineral rocks', category: 'Element', price: 4.00, inStock: true},
  {id: 5, name: 'Boron', description: 'A metalloid element', category: 'Element', price: 5.00, inStock: true},
  {id: 6, name: 'Carbon', description: 'A nonmetallic element', category: 'Element', price: 6.00, inStock: false},
  {id: 7, name: 'Nitrogen', description: 'A colorless, odorless gas', category: 'Element', price: 7.00, inStock: true},
  {id: 8, name: 'Oxygen', description: 'A colorless, odorless reactive gas', category: 'Element', price: 8.00, inStock: true},
  {id: 9, name: 'Fluorine', description: 'A pale yellow gas', category: 'Element', price: 9.00, inStock: false},
  {id: 10, name: 'Neon', description: 'A colorless, odorless, inert monatomic gas', category: 'Element', price: 10.00, inStock: true},
  {id: 11, name: 'Sodium', description: 'A soft, silvery-white, highly reactive metal', category: 'Element', price: 11.00, inStock: true},
  {id: 12, name: 'Magnesium', description: 'A shiny gray solid', category: 'Element', price: 12.00, inStock: false},
  {id: 13, name: 'Aluminum', description: 'A silvery-white, soft, nonmagnetic, ductile metal', category: 'Element', price: 13.00, inStock: true},
  {id: 14, name: 'Silicon', description: 'A hard, brittle crystalline solid', category: 'Element', price: 14.00, inStock: true},
  {id: 15, name: 'Phosphorus', description: 'A highly reactive, nonmetallic element', category: 'Element', price: 15.00, inStock: false},
  {id: 16, name: 'Sulfur', description: 'A bright yellow crystalline solid', category: 'Element', price: 16.00, inStock: true},
  {id: 17, name: 'Chlorine', description: 'A yellow-green gas', category: 'Element', price: 17.00, inStock: true},
  {id: 18, name: 'Argon', description: 'A colorless, odorless, inert monatomic gas', category: 'Element', price: 18.00, inStock: false},
  {id: 19, name: 'Potassium', description: 'A soft, silvery-white metal', category: 'Element', price: 19.00, inStock: true},
  {id: 20, name: 'Calcium', description: 'A soft gray alkaline earth metal', category: 'Element', price: 20.00, inStock: true},
];

/**
 * Data source for the TableSandbox view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableSandboxDataSource extends DataSource<TableSandboxItem> {
  data: TableSandboxItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableSandboxItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableSandboxItem[]): TableSandboxItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableSandboxItem[]): TableSandboxItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
