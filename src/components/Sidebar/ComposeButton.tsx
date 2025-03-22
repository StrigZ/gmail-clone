import { Pencil } from 'lucide-react';

import { CollapsibleButton } from '../ui/collapsible-button';

type Props = { isSidebarOpen: boolean };
export default function ComposeButton({ isSidebarOpen }: Props) {
  return (
    <CollapsibleButton isSidebarOpen={isSidebarOpen} icon={<Pencil />}>
      Compose
    </CollapsibleButton>
  );
}
