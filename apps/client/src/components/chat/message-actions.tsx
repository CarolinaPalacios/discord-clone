import { Flex } from '@mantine/core';

import { MessageButton } from './message-button';

interface MessageActionsProps {
  canUpdateMessage: boolean;
  canDeleteMessage: boolean;
  handleUpdateMessage: () => void;
  handleDeleteMessage: () => void;
}

export function MessageActions({
  canUpdateMessage,
  canDeleteMessage,
  handleUpdateMessage,
  handleDeleteMessage,
}: MessageActionsProps) {
  return (
    <Flex id="actions" justify="end">
      {canDeleteMessage && (
        <MessageButton type="delete" onClick={handleDeleteMessage} />
      )}
      {canUpdateMessage && (
        <MessageButton type="update" onClick={handleUpdateMessage} />
      )}
    </Flex>
  );
}
