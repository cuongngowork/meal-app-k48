import React from 'react'
import { useGlobalContext } from '../context/AppProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Spin } from 'antd'
import { TYPE_OF_MEAL_LIST } from '../constants'

function Meals() {
  const { isLoadingGetMeals, meals, addMealToFavoriteMeals, selectMeal } = useGlobalContext()
  console.log("meals in Meals", meals)

  if (isLoadingGetMeals) {
    return (
      <div style={{
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      }}>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <div className='meals-container'>
      {
        meals?.map(meal => {
          const { idMeal: id, strMeal: name, strMealThumb: image } = meal
          return (
            <div key={id} className='meal-item'>
              <img onClick={() => selectMeal(id, TYPE_OF_MEAL_LIST.ALL)} src={image} alt={name} />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '10px 0'
              }}>
                <p className='meal-name'>{name}</p>
                <FontAwesomeIcon className='meal-icon-thumbs-up' onClick={() => addMealToFavoriteMeals(id)} style={{
                  cursor: 'pointer',
                  color: 'blue'
                }} icon={faThumbsUp} />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Meals
