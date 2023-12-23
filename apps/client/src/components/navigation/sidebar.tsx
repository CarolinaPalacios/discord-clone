import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Center,
  Image,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconArrowsJoin,
  IconMoon,
  IconPlus,
  IconSun,
} from '@tabler/icons-react';
import { UserButton } from '@clerk/clerk-react';
import { useModal } from '../../hooks/use-modal';
import { useServers } from '../../hooks/graphql/server/use-servers';
import classes from './sidebar.module.css';

interface NavbarLinkProps {
  label: string;
  active?: boolean;
  imageUrl: string;
  onClick?: () => void;
}

function NavbarLink({ imageUrl, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right">
      <UnstyledButton
        onClick={onClick}
        data-active={active || undefined}
        variant="transparent"
        style={{ borderRadius: rem(100) }}
      >
        <Image src={imageUrl} w={rem(50)} h={rem(50)} radius={100} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function Sidebar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const { servers, loading } = useServers();
  const { openModal } = useModal('CreateServer');

  const links = servers?.map((server, index) => (
    <NavbarLink
      key={server.id}
      label={server.name}
      imageUrl={server.imageUrl}
      active={active === index}
      onClick={() => {
        setActive(index);
        navigate(`/server/${server.id}`);
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Stack>
        <Center>
          <Button
            className={classes.link}
            variant="subtle"
            radius={100}
            onClick={openModal}
          >
            <IconPlus radius={100} />
          </Button>
        </Center>
        <Center>
          <Button
            className={classes.link}
            variant="subtle"
            radius={100}
            onClick={() => {}}
          >
            <IconArrowsJoin radius={100} />
          </Button>
        </Center>
        <Stack justify="center" gap="md" mt="xl" align="center">
          {links}
        </Stack>
      </Stack>
      <Stack justify="center" align="center">
        <Button
          className={classes.link}
          variant="subtle"
          onClick={toggleColorScheme}
          radius={100}
          p={0}
        >
          {colorScheme === 'dark' ? (
            <IconMoon radius={100} />
          ) : (
            <IconSun radius={100} />
          )}
        </Button>
        <UserButton />
      </Stack>
    </nav>
  );
}
