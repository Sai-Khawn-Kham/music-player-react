import React from 'react'

const Container = ({children, className}) => {
  return (
    <div className={`${className} lg:w-[1024px] mx-auto`}>
      {children}
    </div>
  )
}

export default Container