import * as S from './styles';
import { useEffect } from 'react';
import GalleryLogo from '@/assets/images/galleryLogo.png';
import { Icon } from '@/components';
import { alertStore, useChatStore } from '@/stores/modal';
import ReviewModal from '../reviewModal';
import { PostReview } from '@/types/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReview } from '@/apis/review';
import useCustomNavigate from '@/hooks/useCustomNavigate';
import { useStore } from 'zustand';
import { memberStore } from '@/stores/member';
import ShareModal from '../shareModal';
import useStomp from '@/pages/chatModal/hooks/useStomp';

interface GalleryHeaderProps {
  galleryId: number;
  galleryNick: string;
  chatRoomId: number;
  title: string;
  thumbnail: string;
  content: string;
  nickName: string;
}

const GalleryHeader = ({
  galleryId,
  galleryNick,
  chatRoomId,
  title,
  thumbnail,
  content,
  nickName,
}: GalleryHeaderProps) => {
  const { open, close } = useStore(alertStore);
  const openChat = useChatStore((state) => state.openModal);
  const navigate = useCustomNavigate();
  const queryClient = useQueryClient();
  const {
    auth: { nickname },
    accessToken,
  } = memberStore();

  const location = `https://www.dartgallery.site/info/${galleryId}`;

  const mutation = useMutation({
    mutationKey: ['review'],
    mutationFn: async (data: PostReview) => postReview(data),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['review'],
      });
    },
    onSuccess: () => {
      open({
        title: '후기 등록 완료',
        description: '작성이 완료되었습니다!',
        buttonLabel: '확인',
        onClickButton: () => {
          close();
        },
      });
    },
  });

  const handleReviewSubmit = (data: PostReview & { score: number }) => {
    mutation.mutateAsync({ ...data, galleryId });
  };

  const onHandleToggle = (name: string) => {
    if (name === 'review') {
      open({
        title: '후기 등록하기',
        description: (
          <ReviewModal
            galleryId={galleryId}
            onSubmit={handleReviewSubmit}
            close={close}
          />
        ),
        buttonCancelLabel: '취소',
        buttonLabel: '등록',
        onClickButton: () => {
          const form = document.querySelector('form');
          if (form) {
            form.requestSubmit();
          }
        },
        onClickCancelButton: () => {
          close();
        },
      });
    } else if (name === 'chat') {
      openChat({ chatRoomId, galleryNick, open: true });
    } else if (name === 'share') {
      open({
        title: '전시 공유하기',
        description: (
          <ShareModal
            location={location}
            title={title}
            thumbnail={thumbnail}
            content={content}
            nickname={nickName}
          />
        ),
        buttonLabel: '닫기',
        onClickButton: () => {
          close();
        },
      });
    } else {
      open({
        title: '전시관 나가기',
        description: '전시관에서 나가시겠습니까?',
        buttonCancelLabel: '취소',
        buttonLabel: '확인',
        onClickButton: () => {
          queryClient.removeQueries({ queryKey: ['galleryData'] });
          navigate('/');
        },
        onClickCancelButton: () => {
          close();
        },
      });
    }
  };

  // 웹소켓 연결
  const { connect, disconnect } = useStomp(chatRoomId as number, accessToken as string);

  useEffect(() => {
    if (accessToken) {
      connect();
    }
    return () => disconnect();
  }, [accessToken]);

  return (
    <S.HeaderContainer>
      <S.MenuBlock>
        <S.Logo src={GalleryLogo} alt="로고" />
        <S.MenuBox>
          {accessToken || nickname === galleryNick ? (
            <Icon
              value="review"
              size={30}
              onClick={() => onHandleToggle('review')}
              strokeColor="white"
            />
          ) : null}
          <Icon value="share" size={30} onClick={() => onHandleToggle('share')} />
          <Icon value="chat" size={30} onClick={() => onHandleToggle('chat')} />
          <Icon value="out" size={30} onClick={() => onHandleToggle('out')} />
        </S.MenuBox>
      </S.MenuBlock>
      <S.CopyRight>&copy; 2024 Gallery from D'art.</S.CopyRight>
    </S.HeaderContainer>
  );
};

export default GalleryHeader;
