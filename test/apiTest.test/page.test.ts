import { CRUDTester } from './crudTester'

class PageTester extends CRUDTester {
  constructor(name: string, getPropertyName: string) {
    super(name, getPropertyName)
  }
}

export { PageTester }
