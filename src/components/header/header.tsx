'use client';

import { useState } from 'react';
import SearchBar from './searchBar';
import ProfileDropDown from './profileDropDwon';
import NotificationDropDown from './notificationDropDown';

export default function Header() {
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const [showNotificationDropDown, setShowNotificationDropDown] = useState(false);

  return (
    <div className='w-full h-[50px] mt-6 flex'>
      <img
        src='/'
        alt='로고?'
        className='w-[190px] h-[50px] bg-gray-200 mr-5'
      />
      <SearchBar />
      <div className='relative flex ml-[23px] pr-[23px] items-center'>
        <button
          type='button'
          className='w-[20px] h-[20px] mr-[18px] cursor-pointer'
          onClick={() => setShowNotificationDropDown((prev) => !prev)}
        >
          <img
            src='/icons/notification.svg'
            alt='알림함 아이콘'
          />
        </button>
        {showNotificationDropDown && <NotificationDropDown />}
        <button
          type='button'
          className='w-[20px] h-[20px] cursor-pointer'
          onClick={() => setShowProfileDropDown((prev) => !prev)}
        >
          <img
            src='/icons/profile.svg'
            alt='프로필 아이콘'
          />
        </button>
        {showProfileDropDown && <ProfileDropDown />}
      </div>
    </div>
  );
}
