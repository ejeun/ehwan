import axios from 'axios'
import {browserHistory} from 'react-router'

/* ------------       REDUCER     ------------------ */

const iState = {
  pet: {},
  newMail: {},
  points: {},
  image: {}
}

const reducer = (state = iState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case SELECT_PET:
    newState.pet = action.pet

    break;

    case NEW_MAIL:
    newState.newMail = action.mail
    break;

    case PTS:
    newState.points = action.points
    break;

    default:
    return state
  }

  return newState
}

/* -----------------    ACTIONS     ------------------ */

const SELECT_PET = 'SELECT_PET'
const NEW_MAIL = 'NEW_MAIL'
const PTS = 'PTS'


/* ------------   ACTION CREATORS     ------------------ */

export const selectPet = pet => ({
  type: SELECT_PET, pet
})

export const newMail = mail => ({
  type: NEW_MAIL, mail
})

/* ------------       DISPATCHERS     ------------------ */

export const newPet = pet =>
  dispatch =>
    axios.post('/api/pets/', pet)
      .then((res) => {
        dispatch(selectPet(res.data))
      })
      .catch((err) => console.err(err))

export const sendMail = mail =>
  dispatch =>
    axios.post('/api/mail/', mail)
      .then((res) => {
        dispatch(newMail(res.data))
      })
      .catch((err) => console.err(err))

export const pointsUp = (petId, points) =>
  dispatch =>
    axios.put(`/api/pets/${petId}`, {points: points})
      .then(res => {
        dispatch(selectPet(res.data))
      })
      .catch(failed => console.err(err))

export default reducer
