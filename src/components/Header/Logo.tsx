import { Bangers } from 'next/font/google';
import Image from 'next/image';

import { cn } from '~/lib/utils';

const bangersFont = Bangers({ weight: '400', subsets: ['latin'] });

type Props = {};
export default function Logo({}: Props) {
  return (
    <div
      className={cn('flex items-center gap-2 text-3xl', bangersFont.className)}
    >
      <div className="relative h-10 w-10 rounded-full">
        <Image src={'/gigaCodeLogo.png'} alt="logo" fill />
      </div>
      gigaMail
    </div>
  );
}
