  
import React, { Suspense } from "react";  
import BookPage from '../bookpage'

const page = () => {
  
  return (
    <Suspense fallback={<div>Loading booking page...</div>}>
      <BookPage/>
     </Suspense>
  )
}

export default page
