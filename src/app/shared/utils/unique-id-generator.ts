import { v4 as uuidv4 } from 'uuid';

export class UniqueIdGenerator {
  public static generate(){
      return uuidv4()
  }
}
