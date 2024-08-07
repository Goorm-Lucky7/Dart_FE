import * as S from './styles';
import { useEffect, useState } from 'react';
import { CircleLoader, GalleryDetailPortal, Icon, Text } from '@/components'; // LogoLoader 추가
import { GalleryDataProps, GalleryImages } from '@/types/gallery';
import { galleryDetailStore } from '@/stores/modal';
import useImagesLoaded from '@/pages/gallery/hooks/useImagesLoaded';

const GalleryRotate = ({ galleryData }: GalleryDataProps) => {
  const [state, setState] = useState({
    degrees: 0,
    frontIndex: 0,
    transZ: 400,
    size: 250,
    dataDegree: 0,
  });

  const { open } = galleryDetailStore();

  useEffect(() => {
    const updateSizeAndTransZ = () => {
      if (galleryData) {
        const newDataDegree = 360 / galleryData.images.length;
        let newSize = 250;
        let newTransZ = 400;

        if (galleryData.images.length >= 11 && galleryData.images.length < 15) {
          newSize = 200;
          newTransZ = 480;
        } else if (galleryData.images.length >= 15) {
          newSize = 150;
          newTransZ = 550;
        }

        const reductionFactor = (1920 - window.innerWidth) / 10;
        newSize = Math.max(newSize - reductionFactor, 150); // 최소 사이즈 제한
        newTransZ = Math.max(newTransZ - reductionFactor, 300); // 최소 트랜스Z 제한

        setState((prevState) => ({
          ...prevState,
          dataDegree: newDataDegree,
          size: newSize,
          transZ: newTransZ,
        }));
      }
    };

    updateSizeAndTransZ();

    window.addEventListener("resize", updateSizeAndTransZ);

    return () => window.removeEventListener("resize", updateSizeAndTransZ);
  }, [galleryData]);

  const imageSources = galleryData ? galleryData.images.map(img => img.image) : [];
  const isLoaded = useImagesLoaded(imageSources);

  const onHandleChange = (translate: string) => {
    if (!galleryData) return;

    setState((prevState) => {
      const newDegrees =
        translate === 'previous'
          ? prevState.degrees + prevState.dataDegree
          : prevState.degrees - prevState.dataDegree;
      const newFrontIndex =
        translate === 'previous'
          ? (prevState.frontIndex - 1 + galleryData.images.length) %
            galleryData.images.length
          : (prevState.frontIndex + 1) % galleryData.images.length;

      return {
        ...prevState,
        degrees: newDegrees,
        frontIndex: newFrontIndex,
      };
    });
  };

  if (!isLoaded) {
    return <CircleLoader />;
  }

  return (
    <S.Container>
      <S.MainBlock degrees={state.degrees} size={state.size}>
        {galleryData?.images.map((gallery: GalleryImages, index: number) => (
          <S.ImageBox
            key={index}
            i={index}
            isFront={index === state.frontIndex}
            dataDegree={state.dataDegree}
            transZ={state.transZ}
            onClick={() => open(gallery)}>
            <img src={gallery.image} alt={gallery.imageTitle} />
            <S.ContentBox size={state.size}>
              <Text typography='t6' bold='thin' color='white'>Gallery {index+1}</Text>
              <Text typography='t5' bold='semibold' color='white' className='description'>{gallery.imageTitle}</Text>
            </S.ContentBox>
          </S.ImageBox>
        ))}
      </S.MainBlock>
      <S.BtnBlock>
        <S.Btn className='previous' onClick={() => onHandleChange('previous')}><Icon value='leftArrow' size={50} color='white'/></S.Btn>
        <S.Btn className='next' onClick={() => onHandleChange('next')}><Icon value='rightArrow' size={50} color='white'/></S.Btn>
      </S.BtnBlock>
      <GalleryDetailPortal />
    </S.Container>
  );
};

export default GalleryRotate;