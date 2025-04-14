
import {UserProvider} from './context/userAuth'
import Signup from './screens/Signup'

function App() {


  return (
    <UserProvider>
     <Signup/>
     <h1 className='bg-red-500'>hello</h1>
    </UserProvider>
   
  )
}

export default App
