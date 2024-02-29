import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useProfileStore } from '../stores/profile-store';
import { CreateAccessTokenMutation } from '../gql/graphql';
import { CREATE_ACCESS_TOKEN } from '../graphql/mutations';

interface UseLivekitAccessTokenArgs {
  chatId: string;
}

export function useLivekitAccessToken({ chatId }: UseLivekitAccessTokenArgs) {
  const email = useProfileStore((state) => state.profile?.email);

  const [createToken, { data: dataCreateAccessToken, loading }] =
    useMutation<CreateAccessTokenMutation>(CREATE_ACCESS_TOKEN, {
      variables: {
        identity: email,
        chatId,
      },
      onError: (error) => {
        console.log(error);
      },
    });

  useEffect(() => {
    createToken();
  }, [createToken, chatId, email]);

  return {
    token: dataCreateAccessToken?.createAccessToken,
    loading,
  };
}
