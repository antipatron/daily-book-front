import {MenuItem} from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD',
    icon: 'bx bxs-dashboard',
    link: '',
  },
  {
    id: 3,
    label: 'MENUITEMS.PRODUCT',
    icon: 'bx bx-layer',
    link: '/provider-products/admin/product',
  },
  {
    id: 4,
    label: 'MENUITEMS.PROVIDER',
    icon: 'bx bx-stats',
    link: '/provider-products/admin/provider',
  }
];

