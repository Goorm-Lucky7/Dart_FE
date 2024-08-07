import Dimmed from '@/components/Dimmed';
import Icon from '@/components/icon';
import Text from '@/components/Text';
import { alertStore } from '@/stores/modal';
import { useQuery } from '@tanstack/react-query';
import { getGalleryInfo } from '@/apis/gallery';
import useCustomNavigate from '@/hooks/useCustomNavigate';
import parseDate from '@/utils/parseDate';
import { useState } from 'react';
import * as S from './styles';
import KakaoMap from '../kakaoMap';
import { starRate } from '../../hooks/starRate';
import { CircleLoader } from '@/components';

interface GalleryInfoProps {
  galleryId: number | null | undefined;
  open: boolean;
  hasEnded: boolean;
  close: () => void;
}

const GalleryInfo = ({ galleryId, open: isOpen, hasEnded, close }: GalleryInfoProps) => {
  const openModal = alertStore((state) => state.open);
  const customNavigate = useCustomNavigate();
  const [openMap, setOpenMap] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ['detail'],
    queryFn: () => getGalleryInfo(galleryId as number),
  });

  const onHandlePay = (ticket: boolean, fee: number, isOpen: boolean) => {
    const showModal = (title: string, description: string, onClickButton: () => void) => {
      openModal({
        title,
        description,
        buttonLabel: '확인',
        onClickButton,
      });
    };

    if (!isOpen) {
      showModal(
        '입장 불가',
        '전시가 예정 및 종료 상태로 입장이 불가능합니다.',
        async () => close(),
      );
      return;
    }

    if (ticket || fee === 0) {
      close();
      customNavigate(`/gallery/${galleryId}`);
    } else {
      close();
      customNavigate(`/payment/${galleryId}/ticket`, { hasAuth: true });
    }
  };

  if (isLoading) {
    return <CircleLoader />;
  }

  if (error) {
    openModal({
      title: '오류',
      description:
        '데이터 로드 중 오류가 발생했습니다. 새로고침 하시거나 재로그인 해주세요.',
      buttonLabel: '확인',
      onClickButton: () => close(),
    });
  }

  const onHandleRequest = () => {
    // 재전시 요청 api 완성시 구문 작성
    openModal({
      title: '재전시 요청',
      description: '서비스 준비 중입니다.',
      buttonLabel: '확인',
      onClickButton: () => close(),
    });
  };

  const onHandleMap = () => {
    setOpenMap(!openMap);
  };

  const onHandleClose = () => {
    close();
    customNavigate(`/`);
  };

  if (!isOpen) return null;

  return (
    <Dimmed>
      <S.Container>
        <S.InfoBox thumbnail={data.thumbnail}>
          <S.Overlay />
          <S.CancelIcon
            value="cancel"
            size={20}
            onClick={() => onHandleClose()}
            color="white"
          />
          <S.MainLogo value="mainLogo" color="white" />
          <S.DescriptionBlock>
            <S.Top>
              <Text typography="t5" color="white" bold="medium">
                {data.title}
              </Text>
              <S.User
                onClick={() => {
                  customNavigate(`/member/${data.nickname}`);
                }}
              >
                <S.Circle />
                <Text typography="t7" bold="regular" color="white">
                  {data.nickname}
                </Text>
              </S.User>
            </S.Top>
            <p className="descript">{data.content}</p>
            <Icon value="galaxy" size={20} />
            <Text typography="t7" bold="regular" color="white">
              {parseDate(data.startDate)} <span>~</span>{' '}
              {parseDate(data.endDate) === '1970.01.01' ? null : parseDate(data.endDate)}
            </Text>
            <S.HashTags>
              {data.hashtags.map((tag: string, index: number) => (
                <Text key={index} typography="t7" bold="regular" color="gray300">
                  {`#${tag}`}
                </Text>
              ))}
            </S.HashTags>
          </S.DescriptionBlock>
          <S.ButtonBlock>
            {hasEnded ? (
              <div className="topay" onClick={() => onHandleRequest()}>
                재전시 요청
              </div>
            ) : (
              <>
                <div className="price">₩ {data.fee}</div>
                <div
                  className="topay"
                  onClick={() => onHandlePay(data.hasTicket, data.fee, data.isOpen)}
                >
                  입장하기
                </div>
              </>
            )}
          </S.ButtonBlock>
          {data.address && (
            <S.MapBlock onClick={onHandleMap}>
              <Icon value="mapMarker" size={20} />
              <Text typography="t8" bold="thin" color="gray300">
                {data.address}
              </Text>
            </S.MapBlock>
          )}
          {data.address && openMap && <KakaoMap galleryAddress={data.address} />}
        </S.InfoBox>
        <S.ReviewBox>
          <Text typography="t7" color="white" bold="thin" className="reviewText">
            관람객 평점
          </Text>
          <S.ScoreBlock>
            <S.ScoreWrap>
              <S.Score>
                <Text color="white" bold="bold" typography="t3">
                  {data.reviewAverage}&nbsp;
                </Text>
                <Text color="white" bold="bold" typography="t3">
                  / 5
                </Text>
              </S.Score>
              <S.StarBox>{starRate(data.reviewAverage)}</S.StarBox>
              <Text
                typography="t7"
                color="gray300"
                bold="thin"
                className="reactText"
                onClick={() => {
                  customNavigate(`/review/${galleryId}`);
                }}
              >
                상세 리뷰 보기 &gt;
              </Text>
            </S.ScoreWrap>
            <Text
              typography="t7"
              color="gray300"
              bold="thin"
              className="originalText"
              onClick={() => {
                customNavigate(`/review/${galleryId}`);
              }}
            >
              상세 리뷰 보기 &gt;
            </Text>
          </S.ScoreBlock>
        </S.ReviewBox>
      </S.Container>
    </Dimmed>
  );
};

export default GalleryInfo;
