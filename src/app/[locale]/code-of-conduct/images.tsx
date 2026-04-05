import TShirtSafe from '@/images/tshirt-devfestsafe-and-orga.png';
import Image from 'next/image';

export const TShirtDevfestSafe: React.FC = () => {
  return (
    <Image
      src={TShirtSafe}
      alt='T-shirt DevFest Safe'
      height={300}
      width={0}
      style={{ width: 'auto', height: '300px' }}
    />
  );
};
