'use client';
import ProfileDropDown from '@/components/header/profileDropDwon';
import SearchBar from '@/components/header/searchBar';
import Image from 'next/image';
import { useTitleSearch } from '@/hooks/search/useSearch';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResultSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const startIndex = parseInt(searchParams.get('startIndex') || '1');
  const { data, error, isLoading, isError } = useTitleSearch(keyword, startIndex);

  // if (isLoading) return <div> 로딩 중....</div>;
  // if (isError) return <div> 오류 발생: {error?.message}</div>;
  // 첫 번째 책을 기본으로 표시 (data.books가 있을 경우)
  const book = data?.books[0];
  const emotion = book?.emotions;

  const handleClickMain = () => {
    router.push('/');
  };

  console.log(data);
  return (
    <div className='pt-6 pb-6 width-[1030px] max-h-full'>
      <div className='flex flex-row gap-5'>
        <Image
          src='/icons/logo.svg'
          alt='logo'
          width={190}
          height={38}
          onClick={handleClickMain}
        />
        <SearchBar />
        <Image
          src='/icons/notification.svg'
          alt='notification'
          width={20}
          height={20}
        />
        <Image
          src='/icons/profile.svg'
          alt='profile'
          width={20}
          height={20}
        />
      </div>
      <div className='flex flex-col pt-14'>
        <p>도서명 검색결과 '{data?.totalResults}'건</p>

        <div className='bg-white w-[506px] h-[284px] rounded-[10px] p-5 flex flex-row gap-4'>
          <div className='bg-gray-300 w-[170px] h-[240px] rounded-lg' />
          {/* 여기서 책 세부사항 추가, 예: */}
          <div className='flex flex-col justify-between'>
            {/* 책 제목, 저자 등 스크린샷 기반 */}
            <div>
              <h2 className='font-semibold text-base'>{book?.title}</h2>
              <p className='text-gray-700 text-sm'>{book?.author}</p>
              <p className='text-gray-500 text-xs'>
                {book?.publisher} • {book?.publishedDate}
              </p>
            </div>
            <p>"이 책에 {book?.totalEmotionCount}명이 감정을 기록했어요"</p>
            <div className='flex flex-row gap-4'>
              {emotion?.map((e) => (
                <div
                  key={e.id}
                  className='text-center'
                >
                  <p className='text-green-700 font-semibold mb-2'>
                    {Math.round(e.percentage * 100)}%
                  </p>
                  <div className='w-[44px] h-[44px] rounded-full border bg-gray-200 border-primary-light flex items-center justify-center mb-1 '>
                    <Image
                      src={`/icons/emotion-${e.name}.svg`}
                      alt={e.name}
                      width={26}
                      height={23}
                    />
                  </div>
                  <p>{e.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
