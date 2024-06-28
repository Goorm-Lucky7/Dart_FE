import instance from './instance';
import { FilterType, GalleriesData, GalleryData } from '@/types/gallery';
import { PostGalleries } from '@/types/post';

export const postGalleries = async (formData: PostGalleries, onProgress: (progress: number) => void) => {
  const { thumbnail, images, gallery } = formData;
  const data = new FormData();

  if (thumbnail) {
    data.append('thumbnail', thumbnail);
  }

  if (images) {
    images.forEach((image) => {
      data.append('images', image);
    });
  }

  data.append(
    'gallery',
    new Blob([JSON.stringify(gallery)], { type: 'application/json' }),
  );

  const response = await instance.post('/galleries', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (event) => {
      if (event.total) {
        const progress = Math.round((event.loaded / event.total) * 50); // 0~50%까지 진행
        onProgress(progress);
      }
    }
  });

  return response?.data;
};

interface GetGalleriesParams extends Partial<FilterType> {
  page?: number;
  size?: number;
}

export const getGalleries = async (params: GetGalleriesParams) => {
  const response = await instance.get(`/galleries`, { params });
  return response?.data as GalleriesData;
};

// 전시 페이지 get
export const getGallery = async (galleryId: number) => {
  const response = await instance.get(`/galleries/${galleryId}`);
  return response?.data as GalleryData;
};

// 전시 설명 모달
export const getGalleryInfo = async (galleryId: number) => {
  const response = await instance.get(`/galleries/info?gallery-id=${galleryId}`);
  return response?.data;
};

// 전시 삭제
export const deleteGallery = async (galleryId: number) => {
  const response = await instance.delete(`/galleries`, {
    data: { galleryId },
  });
  return response?.data;
};
