import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const Search = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search;

    const handleChange = (e) => {
        // console.log(e.target.value)
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === "") {
            // ถ้าไม่มีข้อความค้นหา ให้ดึงข้อมูลสินค้าทั้งหมด
            navigate("/shop");
        } else {
            // ส่งข้อความค้นหา
            navigate("/shop?" + text);
        }
    }
    


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    type='search'
                    className='form-control'></input>
            </form>
        </div>
    )
}

export default Search
