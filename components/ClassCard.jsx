import Image from 'next/image';
import {
  HiOutlineCalendar,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineX,
} from 'react-icons/hi';
import toast from 'react-hot-toast';

import SampleAvatar from '@/public/images/sample-avatar.png';

import CustomLink from '@/components/CustomLink';
import { classNames } from '@/lib/helper';
import UnstyledLink from './UnstyledLink';
import useCartStore from '@/store/CartStore';

export default function ClassCard({
  cart,
  addToCart,
  isLive,
  access,
  showPrice,
  showReviewButton,
  onRemove,
  detail,
  id,
}) {
  const carts = useCartStore((state) => state.carts);
  const [addItem, removeItem] = useCartStore((state) => [
    state.addItem,
    state.removeItem,
  ]);

  const isInCart = carts.findIndex((item) => item.id === id) !== -1;

  const handleAddToCart = () => {
    addItem({
      id,
      isLive,
    });

    toast.success('Berhasil ditambahkan ke keranjang');
  };

  const removeFromCart = () => {
    removeItem(id);

    toast.success('Berhasil dihapus dari keranjang');
  };

  return (
    <div className='relative flex flex-col items-start p-4 space-y-2 border rounded-md border-sky-500'>
      <Image src='/images/sample.jpg' width={709} height={383} />
      <div className='flex items-center justify-between w-full gap-4'>
        <span
          className={classNames(
            'inline-block px-4 py-1 text-sm font-semibold rounded-full',
            isLive ? 'bg-green-200' : 'bg-sky-200'
          )}
        >
          {isLive ? 'Live' : 'Non Live'}
        </span>
        {isLive && (
          <span className='inline-flex items-center text-sm font-medium'>
            <HiOutlineCalendar className='inline-block mr-2 text-sky-600' />7
            Juli 2021, 14:00 – 18:00 WIB
          </span>
        )}
      </div>
      <div>
        <h4 className='text-base'>
          Manage your way with great public speaking!
        </h4>
        <p className='text-sm text-gray-500'>
          Public speaking adalah hal yang cukup signifikan dalam kehidupan
          kerja, maka ayo tingkatkan!
        </p>
      </div>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-1'>
          <figure className='flex items-center w-8'>
            <Image src={SampleAvatar} className='block' alt='avatar' />
          </figure>
          <p className='text-sm text-gray-500'>Jack Frost</p>
        </div>
        {access ? (
          <CustomLink href={`/kelas/${isLive ? 'live' : 'non-live'}`}>
            Akses Kelas
          </CustomLink>
        ) : showPrice ? (
          <p className='text-lg font-bold'>Rp 50.000</p>
        ) : showReviewButton ? (
          <CustomLink href='/kelas/review'>Beri Ulasan</CustomLink>
        ) : null}
      </div>
      {addToCart && (
        <div className='flex items-center justify-between w-full'>
          <UnstyledLink
            className='block text-sm font-bold underline text-sky-500 hover:text-sky-600'
            href='/detail'
          >
            Lihat Detail
          </UnstyledLink>
          {isInCart ? (
            <button
              id='hapus'
              onClick={removeFromCart}
              className='flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-400'
            >
              <HiOutlineMinus className='text-lg' />
              <p>Hapus Dari Keranjang</p>
            </button>
          ) : (
            <button
              id='tambah'
              onClick={handleAddToCart}
              className='flex items-center gap-1 px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-sky-400 bg-sky-500'
            >
              <HiOutlinePlus className='text-lg' />
              <p>Tambah Ke Keranjang</p>
            </button>
          )}
        </div>
      )}
      {cart && (
        <button
          onClick={detail.id ? () => onRemove(detail.id) : null}
          className='absolute p-1 text-white bg-red-500 rounded-full -top-4 -right-2'
        >
          <HiOutlineX className='text-lg' />
        </button>
      )}
    </div>
  );
}
