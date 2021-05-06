import { CRUDTester } from './crudTester'

class ProjectTester extends CRUDTester {
  constructor(name: string, getPropertyName: string) {
    super(name, getPropertyName)
  }
}

export { ProjectTester }


