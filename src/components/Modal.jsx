import React from 'react'
import { useGlobalContext } from '../context/AppProvider'

function Modal() {
  const { setShowModal, selectedMeal, setSelectedMeal } = useGlobalContext();
  console.log("selectedMeal", selectedMeal.strSource)
  const { strMealThumb: image, strMeal: name, strInstructions: instructions, strSource: source } = selectedMeal;

  const shortInstructions = (str) => {
    const words = str.split(' ');
    if (words.length > 50) {
      return words.slice(0, 50).join(' ') + '...'
    }
    return str;
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <img src={image} alt="Meal" style={{
          width: '100%',
          height: '300px',
        }} />
        <p>{name}</p>
        <div
          dangerouslySetInnerHTML={{ __html: shortInstructions(instructions) }}
        />
        <p>Source: <a href={source} target='_blank'>{source}</a></p>
      </div>
    </div>
  )
}

export default Modal
