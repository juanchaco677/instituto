
export class AnySort {

  constructor() {

  }

  static asc(array: any[]): any[] {
    const sortedArray: string[] = array.sort((n1, n2) => {
      if (n1.id > n2.id) {
        return 1;
      }

      if (n1.id < n2.id) {
        return -1;
      }

      return 0;
    });
    return sortedArray;
  }

  static desc(array: any[]): any[] {
    const sortedArray: string[] = array.sort((n1, n2) => {
      if (n1.id < n2.id) {
        return 1;
      }

      if (n1.id > n2.id) {
        return -1;
      }

      return 0;
    });
    return sortedArray;
  }
}
