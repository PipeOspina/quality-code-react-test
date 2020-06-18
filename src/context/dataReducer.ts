import { ADD_DATA, RESET_FORM, UPDATE_FORM, formData, state, data, SET_DATA } from './types'
import { unformatNumber } from '../utils'

const addData = (data: formData, state: state) => {
    const parsedData: data = {
        select: data.select,
        trm: unformatNumber(data.trm),
        value: unformatNumber(data.value)
    }
    const newData = [...state.data, parsedData]
    localStorage.setItem('data', JSON.stringify(newData))
    return {
        ...state,
        data: newData
    }
}

const setData = (data: data[], state: state) => {
    return {
        ...state,
        data: data
    }
}

const resetForm = (state: state) => {
    const newForm = {
        value: '',
        select: '',
        trm: ''
    }
    return {
        ...state,
        form: newForm
    }
}

const updateForm = (form: formData, state: state) => {
    return {
        ...state,
        form
    }
}

export default (state: any, action: any) => {
    switch (action.type) {
        case ADD_DATA:
            return addData(action.payload, state)
        case RESET_FORM:
            return resetForm(state)
        case UPDATE_FORM:
            return updateForm(action.payload, state)
        case SET_DATA:
            return setData(action.payload, state)
        default:
            return state
    }
}