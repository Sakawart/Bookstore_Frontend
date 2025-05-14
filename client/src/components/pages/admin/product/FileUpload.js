import React from 'react'
import Resize from 'react-image-file-resizer'
import { useSelector } from 'react-redux'
import axios from 'axios';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';

const FileUpload = ({ loading, setLoading, values, setValues }) => {
    const { user } = useSelector((state) => ({ ...state }))

    const handleChangeFile = (e) => {
        const files = e.target.files;
        if (files) {
            setLoading(true)
            let allfilesUpload = values.images // เป็น []
            for (let i = 0; i < files.length; i++) {  // แก้ไขจาก lenght เป็น length
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        axios
                            .post(
                                process.env.REACT_APP_API + "/images",
                                {
                                    image: uri,
                                },
                                {
                                    headers: {
                                        authtoken: user.token,
                                    },
                                }
                            ).then(res => {
                                console.log(res)
                                allfilesUpload.push(res.data)
                                console.log('allfilesUpload', allfilesUpload)
                                setValues({ ...values, images: allfilesUpload })
                                setLoading(false);
                            }).catch(err => {
                                setLoading(false)
                                console.log(err)
                            })

                    },
                    "base64"

                )
            }
        }
    };

    const handleRemove = (public_id) => {
        setLoading(true)
        console.log(public_id)
        // const img = values.images
        const { images } = values
        axios.post(process.env.REACT_APP_API+'/removeimages',
            {public_id}, {
                headers: {
                    authtoken: user.token
                }
            }
        ).then(res => {
            let filterImages = images.filter(item => {
                return item.public_id !== public_id
            })
            setLoading(false)
            setValues({...values,images: filterImages})
            console.log(res)
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    return (
        <>
            <br />
            {values.images && values.images.map((c) =>
                <Space className='avatar-item'>
                    <Badge
                        onClick={() => handleRemove(c.public_id)}
                        style={{ cursor: "pointer" }}
                        count="X">
                        <Avatar
                            className='m-3'
                            src={c.url} shape="square" size={130}
                            style={{ border: '1px solid #000', borderRadius: '5px' }} />
                    </Badge>
                </Space>
            )}

            <hr />
            <div className='form-group'>
                <label className='btn btn-primary'>Choose File...
                    <input onChange={handleChangeFile}
                        className="form-control"
                        type="file"
                        hidden
                        multiple
                        accept='images/*'
                        name='file'
                    />
                </label>
            </div>
            <br />
        </>
    )
}

export default FileUpload
