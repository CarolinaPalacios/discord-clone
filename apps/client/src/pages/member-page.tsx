import { Outlet, useParams } from 'react-router-dom';
import { ChatWindow } from '../components/chat/chat-window';

export function MemberPage() {
  const { conversationId } = useParams<{ conversationId: string }>();
  if (!conversationId) return null;
  return (
    <>
      <Outlet />
      <ChatWindow chatName={conversationId} chatType="conversation" />
    </>
  );
}
