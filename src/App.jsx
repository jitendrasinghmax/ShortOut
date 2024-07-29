import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Layout } from './layout/layout'
import { Home } from './pages/home'
import { EmailVarification } from './pages/emailVarification'
import { CreateLink } from './pages/createLink'
import { UserDetails } from './pages/userDetails'
import { Redirect } from './pages/redirect'
import { MyUrls } from './pages/myurls'

function App() {
  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/emailvarify/:id' element={<EmailVarification/>}></Route>
            <Route path='/createlink' element={<CreateLink/>}></Route>
            <Route path='/userdetails' element={<UserDetails/>}></Route>
            <Route path='/:id' element={<Redirect></Redirect>}></Route>
            <Route path='/myurl' element={<MyUrls/>}></Route>
            <Route path='/' element={<Home/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
