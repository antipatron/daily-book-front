import {Injectable} from '@angular/core';
import {LanguageService} from '../../shared/translator/language.service';
import {MenuItem} from '../../layouts/sidebar/menu.model';

@Injectable()
export class MenuService {
  menuItems: Array<MenuItem>;

  constructor(public  translatorService: LanguageService) {
    this.menuItems = [];
  }

  addMenu(items: MenuItem[]): void {
    items.forEach((item) => {
      this.translateText(items);
      this.menuItems.push(item);
    });
  }

  async getMenu(): Promise<Array<MenuItem>> {
    const oldMenu: any[] = [];
    Object.assign(oldMenu, this.menuItems);
    this.menuItems = new Array<any>();
    for (const item of oldMenu) {
      const value = true //TODO ORGANIZAR
      if (item.permissions === undefined || value) {
        if (item.subItems) {
          const subItems = [];
          for (const subItem of item.subItems) {
            const hasPermission = true //TODO ORGANIZAR
            if (subItem.permissions === undefined || hasPermission) {
              subItems.push(subItem);
            }
          }
          item.subItems = subItems;
        }
        this.menuItems.push(item);
      }
    }
    return this.menuItems;
  }

  translateText(items: MenuItem[]): void {
    items.forEach((item) => {
      this.translatorService.instant(item.label.toString()).subscribe(result => item.label = result);
      if (item.subItems) {
        this.translateText(item.subItems);
      } else {
        return;
      }
    });
  }
}
