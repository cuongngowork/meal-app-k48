import React from 'react'
import { useGlobalContext } from '../context/AppProvider'
import { TYPE_OF_MEAL_LIST } from '../constants'

function FavoriteMeals() {
  const { favoriteMeals, removeMealFromFavoriteMeals, selectMeal } = useGlobalContext()
  console.log('favoriteMeals', favoriteMeals)

  return (
    <div className='favorite-meals-container'>
      <h2>Favorite Meals</h2>

      <div className='favorite-meal-list'>
        {
          favoriteMeals?.map(favoriteMeal => {
            const { idMeal: id, strMeal: name, strMealThumb: image } = favoriteMeal
            return (
              <div className='favorite-meal-item'>
                <img onClick={() => selectMeal(id, TYPE_OF_MEAL_LIST.FAVORITES)} src={image} alt={name} />
                <button onClick={() => removeMealFromFavoriteMeals(id)}>Remove</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default FavoriteMeals
