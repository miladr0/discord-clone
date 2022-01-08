import React from 'react'
import InviteOnlyLandingImage from '../../assets/invite_only_landing.svg'
import HangingOutEasyLandingImage from '../../assets/hanging_out_easy_landing.svg'
import FandomLandingImage from '../../assets/fandom_landing.svg'
import JustChilingLandingImage from '../../assets/just_chiling_landing.svg'
import TinyStarsLandingImage from '../../assets/tiny_stars_landing.svg'

export default function Footer() {
  return (
    <div className='flex flex-col'>
      <div className='flex md:flex-row justify-center items-center sm:my-28 my-18 px-4'>
        <div className='flex flex-col md:flex-row justify-center items-center'>
          <InviteOnlyLandingImage className='w-11/12 md:w-5/12 lg:w-6/12 xl:w-6/12 2xl:w-4/12' />
          <div className='w-11/12 md:w-5/12 lg:w-4/12  xl:w-3/12 2xl:w-3/12  md:ml-20 '>
            <h1 className='text-left md:text-5xl text-xl leading-8 font-bold tracking-tight md:leading-13 md:mt-0 mt-8'>
              Create an invite-only place where you belong
            </h1>
            <p className='mt-4 text-left md:text-lg text-base text-discord-notQuiteDark'>
              Discord servers are organized into topic-based channels where you
              can collaborate, share, and just talk about your day without
              clogging up a group chat.
            </p>
          </div>
        </div>
      </div>

      <div className='flex  justify-center items-center bg-discord-openGray'>
        <div className='flex flex-col flex-col-reverse md:flex-row justify-center items-center sm:my-28 my-18 px-4'>
          <div className='w-11/12 md:w-5/12 lg:w-4/12   xl:w-3/12 2xl:w-3/12  '>
            <h1 className='text-left md:text-5xl text-xl leading-8 font-bold tracking-tight md:leading-13 md:mt-0 mt-8'>
              Where hanging out is easy
            </h1>
            <p className='mt-4 text-left text-base text-discord-notQuiteDark'>
              Grab a seat in a voice channel when you’re free. Friends in your
              server can see you’re around and instantly pop in to talk without
              having to call.
            </p>
          </div>
          <HangingOutEasyLandingImage className=' md:ml-20 w-11/12 md:w-5/12 lg:w-6/12 xl:w-6/12 2xl:w-4/12' />
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center sm:my-28 my-18 px-4'>
        <FandomLandingImage className='w-11/12 md:w-5/12 lg:w-6/12 xl:w-6/12 2xl:w-4/12' />
        <div className='w-11/12 md:w-5/12 lg:w-4/12  xl:w-3/12 2xl:w-3/12  md:ml-20 '>
          <h1 className='text-left md:text-5xl text-xl leading-8 font-bold tracking-tight md:leading-13 md:mt-0 mt-8'>
            From few to a fandom
          </h1>
          <p className='mt-4 text-left text-base text-discord-notQuiteDark'>
            Get any community running with moderation tools and custom member
            access. Give members special powers, set up private channels, and
            more.
          </p>
        </div>
      </div>

      <div className='flex  justify-center items-center bg-discord-openGray px-4 py-1'>
        <div className='flex flex-1 flex-col justify-center items-center sm:my-18 my-14 p-2 sm:p-4'>
          <div className='flex flex-col justify-center items-center p-1 sm:p-6'>
            <h1 className='text-left md:text-5xl text-3xl leading-8 font-bold tracking-tight md:leading-13 md:mt-0 mt-6'>
              RELIABLE TECH FOR STAYING CLOSE
            </h1>
            <p className='w-full md:w-9/12 px-2 sm:px-4 mt-8 md:text-center text-left text-base text-discord-notQuiteDark '>
              Low-latency voice and video feels like you’re in the same room.
              Wave hello over video, watch friends stream their games, or gather
              up and have a drawing session with screen share.
            </p>
          </div>

          <JustChilingLandingImage className='w-10/12' />
          <TinyStarsLandingImage className='w-full sm:w-85 mt-10 mx-4' />
          <h2 className='text-center  text-4xl font-bold tracking-tight leading-13'>
            Ready to start your journey?
          </h2>
          <a
            href='#'
            className='w-full sm:w-85 md:w-72 flex justify-center items-center bg-discord-indigo hover:bg-discord-experiment500Hover hover:shadow-md  text-white py-4 px-6 mt-10 rounded-full text-lg'
          >
            <span className='inline-block mx-2'>
              <svg className='fill-current w-7 h-7 pt-1' viewBox='0 0 24 24'>
                <g fill='currentColor'>
                  <path d='M17.707 10.708L16.293 9.29398L13 12.587V2.00098H11V12.587L7.70697 9.29398L6.29297 10.708L12 16.415L17.707 10.708Z'></path>
                  <path d='M18 18.001V20.001H6V18.001H4V20.001C4 21.103 4.897 22.001 6 22.001H18C19.104 22.001 20 21.103 20 20.001V18.001H18Z'></path>
                </g>
              </svg>
            </span>
            <span>Download for Mac</span>
          </a>
        </div>
      </div>
    </div>
  )
}
