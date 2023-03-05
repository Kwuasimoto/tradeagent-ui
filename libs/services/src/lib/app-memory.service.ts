import { Injectable } from "@angular/core";
import { LoggerService } from './logger.service';
import { mergeWith } from "lodash";

/*
function mergeWithDefaults<TObj, TSource>(oldObject: TObj, newObject: Partial<TSource>) {
  const customizer = (oldValue: any, newValue: any, key: string) => {
    return !oldValue ? newValue : newValue
  };

  return mergeWith(oldObject, newObject, customizer) as TObj & TSource;
}
*/

@Injectable({
  providedIn: "root"
})
export class AppMemoryService {
  readonly #logger = new LoggerService(AppMemoryService)

  raw(key: string): string | null;
  raw(key: string, defaultValue: string): string;
  raw(key: string, defaultValue?: string): string | null {
    const value = localStorage.getItem(key);
    if (value === null && defaultValue !== undefined) {
      localStorage.setItem(key, defaultValue);
      return defaultValue;
    }
    return value;
  }

  update<T extends object>(key: string, value: T) {
    const toUpdate = this.localStorageStringToType<T>(key);
    const updated = mergeWith(toUpdate, value)
    localStorage.setItem(key, JSON.stringify(updated))
  }

  set(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get<T>(key: string): T {
    return this.localStorageStringToType(key)
  }

  private localStorageStringToType<T> (key: string): T {
    const memoryString = localStorage.getItem(key)
    if(!memoryString) {
      const error = "@localStorageStringToType(key:string) [memoryString: null]"
      this.#logger.info(error)
      throw new Error(error)
    }

    return JSON.parse(memoryString)
  }
}
