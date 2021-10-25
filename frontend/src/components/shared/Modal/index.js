import React, { useEffect, useCallback } from 'react'
import classNames from 'classnames'

export default function Modal({ show, onClose, children, center, big }) {
  const closeOnEscape = useCallback((event) => {
    event = event || window.event

    let isEscape = false
    if ('key' in event) {
      isEscape = event.key === 'Escape' || event.key === 'Esc'
    } else {
      isEscape = event.keyCode === 27
    }

    if (isEscape && show) {
      onClose()
    }
  }, [])

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscape, true)

    return function cleanUp() {
      return document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const centerPosition = center ? 'flex items-center justify-center' : null
  let childPosition = center ? 'flex w-1/2 items-center justify-center' : null

  if (big) {
    childPosition += 'xl:w-8/12 lg:w-7/12 md:w-7/12 sm:w-8/12 w-full'
  }

  const bodyClass = classNames(
    `fixed h-full w-full top-0 left-0 z-50 bg-discord-900 bg-opacity-50 ${centerPosition}`,
    {
      'opacity-0': !show,
      // 'animate-modalOut': !show,
      'pointer-events-none': !show,
      'overflow-x-hidden': show,
      'overflow-y-visible': show,
      'animate-modalIn': show,
    }
  )

  return (
    <div className={bodyClass}>
      <div className={childPosition}>{children}</div>
    </div>
  )
}
