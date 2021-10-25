import React from 'react'
import { Formik, Form } from 'formik'
import LoadingCircle from '../../../assets/loading_circle_icon.svg'
import CloseIcon from '../../../assets/close_icon.svg'

export default function Card({
  initData,
  onClose,
  title,
  description,
  Input,
  UserNameUpdateSchema,
  updateProfile,
}) {
  //
  return (
    <div className='w-full md:w-1/2 flex flex-col mx-4 mx-auto bg-discord-selectMuted'>
      <div className='w-full  relative flex flex-col items-center justify-center p-4'>
        <h4 className='text-center text-xl font-bold text-white'>{title}</h4>
        <p className='text-sm mt-2 text-discord-mainText'>{description}</p>
        <button
          onClick={onClose}
          className='absolute top-0 right-0 m-2 rounded-full p-2 flex items-center justify-center border-discord-popOutHeader focus:outline-none'
        >
          <CloseIcon className='fill-current w-4 h-4 text-discord-topIcons' />
        </button>
      </div>

      <div className='w-full  flex flex-col'>
        <Formik
          initialValues={{ ...initData }}
          validationSchema={UserNameUpdateSchema}
          onSubmit={updateProfile}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col mt-2 rounded-lg'>
              <div className='p-4'>
                <Input />
              </div>

              <div className='flex bg-discord-700 justify-end p-4 items-center'>
                <button className='text-sm text-white mr-4' onClick={onClose}>
                  Cancel
                </button>
                <button className='bg-discord-experiment500 hover:bg-discord-experiment500Disabled text-sm rounded-md text-white p-2 px-6'>
                  {isSubmitting ? (
                    <LoadingCircle className='animate-spin h-5 w-5 text-white mx-auto' />
                  ) : (
                    'Done'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
