import { cn } from '~/lib/utils';

type Props = { className?: string };
export default function EmailList({ className }: Props) {
  return (
    <div className={cn('rounded-lg bg-background/50 shadow', className)}>
      EmailList
    </div>
  );
}
