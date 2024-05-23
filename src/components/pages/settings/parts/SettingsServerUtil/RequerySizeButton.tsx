import { Response } from '@/lib/api/response';
import { fetchApi } from '@/lib/fetchApi';
import { Button, Group, Modal, Stack, Switch, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconFileSearch } from '@tabler/icons-react';
import { useState } from 'react';

export default function RequerySizeButton() {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [forceDelete, setForceDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const handle = async () => {
    modals.closeAll();

    const { data, error } = await fetchApi<Response['/api/server/requery_size']>(
      '/api/server/requery_size',
      'POST',
      {
        forceUpdate,
        forceDelete,
      },
    );

    if (!error && data) {
      showNotification({
        message: data.status,
        icon: <IconFileSearch size='1rem' />,
      });
    }
  };

  return (
    <>
      <Modal title={<Title>Are you sure?</Title>} opened={open} onClose={() => setOpen(false)}>
        <Stack>
          <span>
            This will requery the size of every file stored within the database. Additionally you can use the
            options below to delete file that aren&apos;t found in the database as well as force updating the
            size of every file whether or not it has a size.
          </span>

          <Switch
            label='Force Update'
            checked={forceUpdate}
            onChange={() => setForceUpdate((val) => !val)}
            color='red'
          />

          <Switch
            label='Force Delete'
            checked={forceDelete}
            onChange={() => setForceDelete((val) => !val)}
            color='red'
          />
        </Stack>

        <Group justify='flex-end'>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color='red' onClick={handle}>
            Requery
          </Button>
        </Group>
      </Modal>
      <Button size='sm' leftSection={<IconFileSearch size='1rem' />} onClick={() => setOpen(true)}>
        Requery Size of Files
      </Button>
    </>
  );
}
