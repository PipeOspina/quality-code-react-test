import React, { useReducer, useEffect } from 'react';
import Home from './pages/Home'
import DataContext from './context/dataContext'
import DataReducer from './context/dataReducer'
import { ADD_DATA, data, RESET_FORM, UPDATE_FORM, formData, SET_DATA } from './context/types'
import './App.css'

function App() {
  const initialState = {
    data: [],
    form: {}
  }

  const [state, dispatch] = useReducer(DataReducer, initialState)

  const addData = (data: formData) => {
    dispatch({
      type: ADD_DATA,
      payload: data
    })
  }

  const setData = (data: data[]) => {
    dispatch({
      type: SET_DATA,
      payload: data
    })
  }

  const resetForm = () => {
    dispatch({
      type: RESET_FORM
    })
  }

  const updateForm = (form: formData) => {
    dispatch({
      type: UPDATE_FORM,
      payload: form
    })
  }

  return <>
    <DataContext.Provider
      value={{
        data: state.data,
        form: state.form,
        addData,
        resetForm,
        updateForm,
        setData
      }}
    >

      <Home />
    </DataContext.Provider>
  </>
}

export default App;
