import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"
import { TYPE_OF_MEAL_LIST } from "../constants"

const AppContext = createContext()

export const useGlobalContext = () => {
  return useContext(AppContext)
}

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [isLoadingGetMeals, setIsLoadingGetMeals] = useState(false)


  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const selectMeal = (id, typeOfMealList) => {
    let meal = null
    if (typeOfMealList === TYPE_OF_MEAL_LIST.ALL) {
      meal = meals.find(meal => meal.idMeal === id)
    } else {
      meal = favoriteMeals.find(meal => meal.idMeal === id)
    }
    setSelectedMeal(meal)
    setShowModal(true)
  }



  const [favoriteMeals, setFavoriteMeals] = useState([])
  const addMealToFavoriteMeals = (id) => {
    // check meal already in favoriteMeals
    // false => add, true => not add
    const checkAlreadyFavoriteMeal = favoriteMeals.find(meal => meal.idMeal === id)
    if (checkAlreadyFavoriteMeal) {
      return;
    }
    const newFavoriteMeal = meals.find(meal => meal.idMeal === id)
    const updatedFavoriteMeals = [...favoriteMeals, newFavoriteMeal]
    setFavoriteMeals(updatedFavoriteMeals)
  }
  const removeMealFromFavoriteMeals = (id) => {
    const updatedFavoriteMeals = favoriteMeals.filter(meal => meal.idMeal !== id)
    setFavoriteMeals(updatedFavoriteMeals)
  }








  const fetchMeals = async (url) => {
    setIsLoadingGetMeals(true)
    try {
      const result = await axios.get(url)
      console.log("result", result)
      setMeals(result?.data?.meals)
    } catch (error) {
      console.log("error", error)
      setMeals([])
    } finally {
      setIsLoadingGetMeals(false)
    }
  }

  useEffect(() => {
    fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  }, [])

  return (
    <AppContext.Provider value={{
      name: 'John',
      isLoadingGetMeals: isLoadingGetMeals,
      meals: meals,
      favoriteMeals: favoriteMeals,
      addMealToFavoriteMeals: addMealToFavoriteMeals,
      removeMealFromFavoriteMeals: removeMealFromFavoriteMeals,

      showModal: showModal,
      setShowModal: setShowModal,
      selectedMeal: selectedMeal,
      setSelectedMeal: setSelectedMeal,
      selectMeal: selectMeal,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
