import axios from 'axios'
import {browserHistory} from 'react-router'

/* ------------       REDUCER     ------------------ */

const iState = {
  pet: {},
}

const reducer = (state = iState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case SELECT_PET:
    newState.pet = action.pet
    break;

    // case SELECT_PET:
    // newState.pet = action.pet
    // break;

    default:
    return state
  }

  return newState
}

/* -----------------    ACTIONS     ------------------ */

const SELECT_PET = 'SELECT_PET'

/* ------------   ACTION CREATORS     ------------------ */

export const selectPet = pet => ({
  type: SELECT_PET, pet
})

/* ------------       DISPATCHERS     ------------------ */

export const newPet = (kind, name) =>
  dispatch =>
    axios.post('/api/pets/', {kind, name})
      .then((pet) => {
        dispatch(selectPet(pet))
      })
      .catch((err) => console.err(err))

// export const logout = () =>
//   dispatch =>
//     axios.post('/api/auth/logout')
//       .then(() => {
//             browserHistory.push('/')
//             dispatch(whoami())
//         })
//       .catch(() => dispatch(whoami()))

// export const whoami = () =>
//   dispatch =>
//     axios.get('/api/auth/whoami')
//       .then(response => {
//         const user = response.data
//         dispatch(SELECT_PET(user))
//       })
//       .catch(failed => dispatch(SELECT_PET(null)))

export default reducer
