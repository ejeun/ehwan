import axios from 'axios'
import {browserHistory} from 'react-router'

/* ------------       REDUCER     ------------------ */

const iState = {
  pet: {},
  newMail: {},
  allMail: [],
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

    default:
    return state
  }

  return newState
}

/* -----------------    ACTIONS     ------------------ */

const SELECT_PET = 'SELECT_PET'
const NEW_MAIL = 'NEW_MAIL'

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

// export const whoami = () =>
//   dispatch =>
//     axios.get('/api/auth/whoami')
//       .then(response => {
//         const user = response.data
//         dispatch(SELECT_PET(user))
//       })
//       .catch(failed => dispatch(SELECT_PET(null)))

export default reducer
