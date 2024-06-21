import { getChatMembers } from '@/apis/chat';
import { useQuery } from '@tanstack/react-query';

export const useGetMembers = (chatRoomId: number) =>
  useQuery({
    queryKey: ['memember', chatRoomId],
    queryFn: () => getChatMembers(chatRoomId),
    enabled: !!chatRoomId,
  });
