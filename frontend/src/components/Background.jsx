import Image from 'next/image';
import landing from '../../public/landing.jpg';

const Background = () => {
  return (
    <div>
      <Image 
        alt='Landing'
        src={landing}
        quality={100}
        fill
        className='object-cover -z-10'
      />
      <div className="absolute inset-0 bg-black opacity-80 -z-10"></div>
    </div>
  )
}

export default Background;
