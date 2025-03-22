import { Menu } from 'lucide-react';

import { Button } from '../ui/button';

type Props = { handleSidebarOpen: () => void };
export default function MenuButton({ handleSidebarOpen }: Props) {
  return (
    <Button
      className="fixed left-2 top-4 h-12 rounded-full"
      onClick={handleSidebarOpen}
      variant="ghost"
    >
      <Menu />
    </Button>
  );
}
