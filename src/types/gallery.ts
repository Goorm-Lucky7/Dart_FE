export type GalleryImages = {
  image: string;
  imageTitle: string;
  description: string;
};

export type GalleryData = {
  title: string;
  hasComment: boolean;
  nickname: string;
  hasTicket: boolean;
  chatRoomId: number;
  template: string;
  content: string;
  thumbnail: string;
  images: GalleryImages[];
};

export interface GalleryDataProps {
  galleryData: GalleryData;
}

export interface Gallery {
  galleryId: number;
  thumbnail: string;
  title: string;
  startDate: Date;
  endDate: Date | null;
  fee: number;
  hashtags: string[];
}

export interface PageInfo {
  pageIndex: number;
  isDone: boolean;
}

export interface GalleriesData {
  pages: Gallery[];
  pageInfo: PageInfo;
}

export interface GalleryDesc extends Gallery {
  nickname: string;
  profileImage: string;
  reviewAverage: number;
  hasTicket: boolean;
  content: string;
}

export interface FilterType {
  keyword: string;
  category: 'hashtag' | 'author' | 'title';
  sort: 'latest' | 'liked';
  cost: 'all' | 'free' | 'pay';
  display: 'all' | 'upcoming' | 'inprogress' | 'finished';
}

export type CategoryValues = FilterType['category'];
export type DispalyValues = FilterType['display'];
export type SortValues = FilterType['sort'];
export type CostValues = FilterType['cost'];

export interface MyCustomEvent extends Event {
  data: string; // 'data'를 문자열로 명시
}

export interface SSEData {
  message: number;
  type: string | null;
}
