import React, { useEffect, useContext } from 'react'
import Form from '../components/Form'
import './Home.css'
import Table from '../components/Table'
import DataContext from '../context/dataContext'

const Home = () => {
    const context = useContext(DataContext)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data') || '[]')
        context.setData(data)
    }, [])
    return <>
        <div className='container'>
            <Form />
            <Table />
        </div>
    </>
}

export default Home