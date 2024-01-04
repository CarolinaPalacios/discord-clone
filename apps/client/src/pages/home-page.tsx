import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useSession } from '@clerk/clerk-react';

import { CREATE_PROFILE } from '../graphql/mutations';
import { CreateProfileMutation } from '../gql/graphql';
import { useProfileStore } from '../stores';

export function HomePage() {
  const { session } = useSession();
  console.log({ session: session });
  const profile = useProfileStore((state) => state.profile);

  const [createProfile] = useMutation<CreateProfileMutation>(CREATE_PROFILE);
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    // User doesn't exist in the backend, so create them
    const createProfileFn = async () => {
      try {
        await createProfile({
          variables: {
            input: {
              email: session?.user.emailAddresses[0].emailAddress,
              name: session?.user.fullName,
              imageUrl: session?.user.imageUrl,
            },
            skip: !session?.user.emailAddresses[0].emailAddress,
          },
          onCompleted: (data) => {
            console.log({ data: data });
            setProfile(data.createProfile);
          },
          onError: (error) => {
            console.error('Error creating user in backend:', error);
          },
        });
      } catch (error) {
        console.error('Error creating user in backend:', error);
      }
    };

    if (!profile?.id) createProfileFn();
  }, [
    session,
    setProfile,
    profile?.id,
    profile?.email,
    profile?.imageUrl,
    profile?.name,
    createProfile,
  ]);

  return (
    <div>
      <img src="/discord-logo-3-1.png" alt="Discord" width={'50%'} />
      <h1>Welcome, {session?.user.fullName}!</h1>
      <p>
        You're logged in with {session?.user.emailAddresses[0].emailAddress}.
      </p>
    </div>
  );
}
