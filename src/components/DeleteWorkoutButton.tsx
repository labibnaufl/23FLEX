'use client';

import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { deleteWorkout } from '@/actions/schedule';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteWorkoutButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    const confirmDelete = confirm("Yakin ingin menghapus catatan latihan ini?");
    if (!confirmDelete) return;

    startTransition(async () => {
      await deleteWorkout(id);
      router.refresh(); // reload data setelah hapus
    });
  };

  return (
    <Button
      variant="destructive"
      className="flex items-center gap-2"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="w-4 h-4" />
      <span className="hidden lg:inline">{isPending ? 'Menghapus...' : 'Hapus'}</span>
    </Button>
  );
}
