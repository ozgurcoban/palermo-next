export interface IMenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
  flag?: string;
}

export interface ISubCategory {
  sub_category_title: string;
  description: string;
  menu_list: IMenuItem[];
}

export type IMenuList = IMenuItem | ISubCategory;

export interface INewsItem {
  id: string;
  media_url: string;
  caption: string;
  timestamp: string;
  media_type: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO"
}

export interface ILocale {
  locale: string;
  params: any;
}
