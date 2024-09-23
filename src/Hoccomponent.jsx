import React from 'react'

function Hoccomponent(props) {
    const newstyle={
        background:'blue'
    }
  return (
    <div style={newstyle}>
        {props.children}
      
    </div>
  )
}

export default Hoccomponent
