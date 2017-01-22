import React from 'react'

import Header from './Header'
import Footer from './Footer'

/* ----- COMPONENT ----- */

export default function(props) {

  return (
    <div id="main" className="container">
      <Header />
      {
        props.children && React.cloneElement(props.children, props)
      }
      <Footer />
    </div>
  )
}
