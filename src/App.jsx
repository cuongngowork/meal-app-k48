import './App.css'
import { useGlobalContext } from './context/AppProvider'
import Meals from './components/Meals'
import FavoriteMeals from './components/FavoriteMeals'
import Modal from './components/Modal'

function App() {
  const { name, showModal } = useGlobalContext()
  console.log("name", name)

  return (
    <>
      <FavoriteMeals />
      <Meals />
      { showModal && <Modal /> }
    </>
  )
}

export default App
