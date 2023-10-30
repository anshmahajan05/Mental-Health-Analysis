import './App.css'
import NavBar from './components/client/NavBar'
import LoginForm from './components/client/LoginForm'
import LoginImage from './components/client/LoginImage'
function App() {

  return (<>
    <div style={{flex:1, padding:"5px", marginLeft:"20px"}}>
      <NavBar/>
      
      <LoginForm />
    </div>
  </>
  )
}

export default App
