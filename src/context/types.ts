export const ADD_DATA = 'ADD_DATA'
export const RESET_FORM = 'RESET_FORM'
export const UPDATE_FORM = 'UPDATE_FORM'
export const SET_DATA = 'SET_DATA'

export type state = {
    data: data[],
    form: formData
}

export type formData = {
    value: string,
    select: string,
    trm: string
}

export type data = {
    value: number,
    select: string,
    trm: number
}

export type action = {
    type: 'ADD_DATA' | 'RESET_FORM',
    payload: data | formData
}