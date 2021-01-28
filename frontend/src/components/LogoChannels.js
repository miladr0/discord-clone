import React from 'react'
import newLineLogo from '../assets/new_line.png'

export default function LogoChannels() {
  return (
    <div className='flex-none w-18 flex flex-col min-h-screen h-screen bg-discord-900 px-2 py-2'>
      <div className='overflow-y-auto overflow-hidden'>
        <ul className='text-center'>
          <li className='mt-3'>
            <a
              href='#'
              className='flex items-center mx-auto w-12 h-12 bg-discord-800 text-discord-100 hover:bg-discord-indigo hover:text-white hover:rounded-2xlg duration-100 transition ease-linear rounded-full inline-block'
            >
              <svg
                className='w-7 h-7 text-center mx-auto'
                aria-hidden='false'
                width='28'
                height='20'
                viewBox='0 0 28 20'
              >
                <path
                  fill='currentColor'
                  d='M20.6644 20C20.6644 20 19.8014 18.9762 19.0822 18.0714C22.2226 17.1905 23.4212 15.2381 23.4212 15.2381C22.4384 15.881 21.5034 16.3334 20.6644 16.6429C19.4658 17.1429 18.3151 17.4762 17.1884 17.6667C14.887 18.0953 12.7774 17.9762 10.9795 17.6429C9.61301 17.381 8.43836 17 7.45548 16.6191C6.90411 16.4048 6.30479 16.1429 5.70548 15.8096C5.63356 15.7619 5.56164 15.7381 5.48973 15.6905C5.44178 15.6667 5.41781 15.6429 5.39384 15.6191C4.96233 15.381 4.7226 15.2143 4.7226 15.2143C4.7226 15.2143 5.87329 17.1191 8.91781 18.0238C8.19863 18.9286 7.31164 20 7.31164 20C2.0137 19.8333 0 16.381 0 16.381C0 8.7144 3.45205 2.50017 3.45205 2.50017C6.90411 -0.07123 10.1884 0.000197861 10.1884 0.000197861L10.4281 0.285909C6.11301 1.52399 4.12329 3.40493 4.12329 3.40493C4.12329 3.40493 4.65068 3.11921 5.53767 2.71446C8.10274 1.59542 10.1404 1.2859 10.9795 1.21447C11.1233 1.19066 11.2432 1.16685 11.387 1.16685C12.8493 0.976379 14.5034 0.92876 16.2295 1.11923C18.5068 1.38114 20.9521 2.0478 23.4452 3.40493C23.4452 3.40493 21.5514 1.61923 17.476 0.381146L17.8116 0.000197861C17.8116 0.000197861 21.0959 -0.07123 24.5479 2.50017C24.5479 2.50017 28 8.7144 28 16.381C28 16.381 25.9623 19.8333 20.6644 20ZM9.51712 8.88106C8.15068 8.88106 7.07192 10.0715 7.07192 11.5239C7.07192 12.9763 8.17466 14.1667 9.51712 14.1667C10.8836 14.1667 11.9623 12.9763 11.9623 11.5239C11.9863 10.0715 10.8836 8.88106 9.51712 8.88106ZM18.2671 8.88106C16.9007 8.88106 15.8219 10.0715 15.8219 11.5239C15.8219 12.9763 16.9247 14.1667 18.2671 14.1667C19.6336 14.1667 20.7123 12.9763 20.7123 11.5239C20.7123 10.0715 19.6336 8.88106 18.2671 8.88106Z'
                ></path>
              </svg>
            </a>
          </li>
          <li className='border-b border-gray-700 mx-2 mt-3'></li>
          <li className='mt-3'>
            <a href='#'>
              <img
                src={newLineLogo}
                alt='discord'
                className='w-12 h-12 rounded-lg mx-auto'
              />
            </a>
          </li>
          <li className='mt-3'>
            <a
              href='#'
              className='flex items-center mx-auto w-12 h-12 bg-discord-800 text-discord-green hover:bg-green-500 hover:text-white hover:rounded-2xlg duration-100 transition ease-linear rounded-full inline-block'
            >
              <svg
                className='w-6 h-6 text-center mx-auto'
                aria-hidden='false'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z'
                ></path>
              </svg>
            </a>
          </li>
          <li className='mt-3'>
            <a
              href='#'
              className='flex mx-auto items-center w-12 h-12 bg-discord-800 text-discord-green hover:bg-green-500 hover:text-white hover:rounded-2xlg duration-100 transition ease-linear rounded-full inline-block'
            >
              <svg
                className='w-6 h-6 text-center mx-auto'
                aria-hidden='false'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z'
                ></path>
              </svg>
            </a>
          </li>
          <li className='border-b border-gray-700 mx-4 mt-3'></li>
          <li className='mt-3'>
            <a
              href='#'
              className='flex mx-auto items-center w-12 h-12 bg-discord-800 text-discord-green hover:bg-green-500 hover:text-white hover:rounded-2xlg duration-100 transition ease-linear rounded-full inline-block'
            >
              <svg
                className='w-6 h-6 text-center mx-auto'
                aria-hidden='false'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M16.293 9.293L17.707 10.707L12 16.414L6.29297 10.707L7.70697 9.293L11 12.586V2H13V12.586L16.293 9.293ZM18 20V18H20V20C20 21.102 19.104 22 18 22H6C4.896 22 4 21.102 4 20V18H6V20H18Z'
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
