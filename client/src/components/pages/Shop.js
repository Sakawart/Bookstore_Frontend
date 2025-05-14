import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../card/ProductCard';

//antd
import { Checkbox } from "antd";

//function
import { listProduct, searchFilters } from '../functions/product';
import { listCategory } from '../functions/category';


const Shop = () => {

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    //Category
    const [category, setCategory] = useState([])
    const [categorySelect, setCategorySelect] = useState([])

    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search //text

    useEffect(() => {
        loadData()
        listCategory()
            .then(res => setCategory(res.data))
    }, [])

    const loadData = () => {
        setLoading(true)
        listProduct(12)
            .then((res) => {
                setProduct(res.data)
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    // load data เมื่อ user ค้นหา
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchDataFilter({ query: text })
        }, 300)
        return () => clearTimeout(delay)
    }, [text])

    // Filter
    const fetchDataFilter = (arg) => {
        searchFilters(arg)
            .then(res => {
                setProduct(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const handlecheck = (e) => {
        // ค่าปัจจุบันที่ Check
        let inCheck = e.target.value
        // ค่าเดิมของ Check
        let inState = [...categorySelect]

        let findCheck = inState.indexOf(inCheck)

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setCategorySelect(inState)
        fetchDataFilter({ category: inState });
        if (inState.length < 1) {
            loadData()
        }
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>

                    <div className='col-md-2'>
                        Filter / Search
                        <hr />
                        <h5>หมวดหมู่</h5>
                        {category.map((item, index) => (
                            <div key={index} style={{ marginBottom: '5px' }}>
                                <Checkbox
                                    onChange={handlecheck}
                                    checked={categorySelect.includes(item._id)} // ใช้ checked เพื่อระบุว่า checkbox นี้ถูกเลือกหรือไม่
                                    value={item._id} // value ยังคงใช้ได้ถ้าจำเป็นต้องใช้งานใน handlecheck
                                >
                                    {item.name}
                                </Checkbox>

                            </div>
                        ))}
                    </div>


                    <div className='col-md-10'>
                        {loading
                            ? <h4 className='text-danger'>Loading...</h4>
                            : <h3 className='mt-2' style={{ textAlign: 'center' }}>รายการสินค้า</h3>
                        }

                        {product.length < 1 && <p>ไม่พบสินค้า</p>}

                        <div className='row pb-4'>
                            {product.map((item, index) =>
                                <div key={index} className='col-md-3 mt-3'>
                                    <ProductCard product={item} />
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Shop
