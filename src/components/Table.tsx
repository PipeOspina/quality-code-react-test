import React, { useContext, useState, useEffect } from 'react'
import { Table as BootstrapTable, Pagination, Button } from 'react-bootstrap'
import DataContext from '../context/dataContext'
import { formatNumber } from '../utils'
import './Table.css'

const Table = () => {
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState([1])

    const [content, setContent] = useState([{
        index: 0,
        value: '',
        select: '',
        trm: ''
    }])

    const context = useContext(DataContext)

    const handlePrev = () => {
        if (page !== 1) setPage(page - 1)
    }

    const handleNext = () => {
        if ((page + 1) <= pages.length) setPage(page + 1)
    }

    const handlePage = (event: any) => {
        setPage(parseInt(event.target.text))
    }

    const determinatePages = () => {
        const currentPages = []
        for (let i = 0; i < (context.data.length / 5); i++) {
            currentPages.push(i + 1)
        }
        setPages(currentPages)
    }

    const organizeData = () => {
        const currentContent = context.data
            .slice(0)
            .reverse()
            .map((data, index) => {
                return {
                    ...data,
                    index: context.data.length - index
                }
            })
            .slice((page - 1) * 5, (page * 5) < context.data.length ? page * 5 : context.data.length)
            .map(data => {
                return {
                    value: formatNumber(data.value),
                    select: data.select,
                    trm: formatNumber(data.trm),
                    index: data.index
                }
            })
        setContent(currentContent)
    }

    const handleDelete = () => {
        context.setData([])
        localStorage.setItem('data', '[]')
    }

    useEffect(() => {
        determinatePages()
        organizeData()
    }, [context.data, page])

    return <>
        <div className={`table-container ${context.data.length === 0 ? 'no-display' : ''}`}>
            <BootstrapTable
                striped
                bordered
                hover
                responsive="sm"
            >
                <thead>
                    <tr>
                        <th>Consecutivo</th>
                        <th>Valor</th>
                        <th>Descripción del campo seleccionado</th>
                        <th>TRM</th>
                    </tr>
                </thead>
                <tbody>
                    {content.map(data => <>
                        <tr key={data.index.toString()}>
                            <td>{data.index}</td>
                            <td>{data.value}</td>
                            <td>{data.select}</td>
                            <td>{data.trm}</td>
                        </tr>
                    </>)}
                </tbody>
            </BootstrapTable>
            <div className='pagination-container'>
                <Pagination className='pagination'>
                    <Pagination.Prev onClick={handlePrev} />
                    {pages.map((current) => current === page ? <Pagination.Item active >{current}</Pagination.Item> : <Pagination.Item onClick={handlePage}>{current}</Pagination.Item>)}
                    <Pagination.Next onClick={handleNext} />
                </Pagination>
                <Button
                    variant='danger'
                    onClick={handleDelete}
                >
                    Eliminar Datos
                </Button>
            </div>
        </div>
    </>
}

export default Table