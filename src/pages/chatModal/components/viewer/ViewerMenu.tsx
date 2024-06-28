import Member from './Member';
import { useGetMembers } from '../../hooks/useGetMembers';
import * as S from './styles';
import useStomp from '../../hooks/useStomp';
import { useEffect } from 'react';
import { memberStore } from '@/stores/member';
import { ChatMembers } from '@/types/chat';

const ViewerMenu = ({ chatRoomId }: { chatRoomId: number }) => {
  // 웹소켓 연결
  const { accessToken } = memberStore.getState();
  const { connect, disconnect } = useStomp(chatRoomId, accessToken as string);
  const { data, refetch } = useGetMembers(chatRoomId);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  refetch();
  return (
    <S.Container>
      {data.map((viewer: ChatMembers, index: number) => (
        <Member
          key={index}
          name={viewer.nickname}
          profileImageUrl={viewer.profileImageUrl}
        />
      ))}
    </S.Container>
  );
};

export default ViewerMenu;
