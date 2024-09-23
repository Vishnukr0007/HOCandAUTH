import React from 'react'

function Auth(props) {
    const pass='12345'
    if(pass!=='12345'){
        return <h1>you are not autherized</h1>
    }else{
        return props.children
    }
  
}

export default Auth
