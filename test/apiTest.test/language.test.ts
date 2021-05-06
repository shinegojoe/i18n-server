import { CRUDTester } from './crudTester'

class LanguageTester extends CRUDTester {
  constructor(name: string, getPropertyName: string) {
    super(name, getPropertyName)
  }
}

export { LanguageTester }

