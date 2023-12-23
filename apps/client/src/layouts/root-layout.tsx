import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth, useSession } from '@clerk/clerk-react';
import { useMutation } from '@apollo/client';
import { Sidebar } from '../components/navigation/sidebar';
import { useProfileStore } from '../stores/profile-store';
import {
  CreateProfileMutation,
  CreateProfileMutationVariables,
} from '../gql/graphql';
import { CREATE_PROFILE } from '../graphql/mutations/create-profile';

export function RootLayout() {
  const profile = useProfileStore((state) => state.profile);
  const setProfile = useProfileStore((state) => state.setProfile);
  const { session } = useSession();
  const { isSignedIn } = useAuth();

  console.log(profile);

  const [createProfile] = useMutation<
    CreateProfileMutation,
    CreateProfileMutationVariables
  >(CREATE_PROFILE, {});

  useEffect(() => {
    if (!isSignedIn) setProfile(null);
  }, [isSignedIn, setProfile]);

  useEffect(() => {
    const createProfileFn = async () => {
      if (!session?.user) return;
      try {
        await createProfile({
          variables: {
            input: {
              email: session?.user.emailAddresses[0].emailAddress,
              name: session?.user.username || '',
              imageUrl: session?.user.imageUrl,
            },
          },
          onCompleted: (data) => {
            setProfile(data.createProfile);
          },
        });
      } catch (error) {
        console.error('error creating profile in backend', error);
      }
    };
    if (profile?.id) return;
    createProfileFn();
  }, [session?.user, profile?.id]);
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}
