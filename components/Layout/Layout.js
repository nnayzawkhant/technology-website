import React, { useState,  createContext} from 'react'
import SecondNav from '../Navbar/SecondNav'
import Footer from '../Footer'
export const LayoutContext = createContext(null);

const Layout = ({children}) => {
  let [search, setSearch] = useState('');

  return (
        <LayoutContext.Provider value={{search}}>
          <div>
            <SecondNav setSearch={setSearch}/>
            {children}
            <Footer/>
        </div>
        </LayoutContext.Provider>
  )
}


export default Layout