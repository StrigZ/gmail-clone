import { Menu } from 'lucide-react';

import Logo from './Header/Logo';
import { Button } from './ui/button';

type Props = {};
export default function Sidebar({}: Props) {
  return (
    <aside className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="rounded-full">
        <Menu />
      </Button>
      <Logo />
    </aside>
  );
}
