import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { CategoryTree } from './CategoryTree'

const baseURL = import.meta.env.VITE_BASE_URL;

const Category = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState({})

    useEffect(() => {
        axios
            .request({
                // get category info
                method: "get",
                url: `${baseURL}/categories`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("user-token")
                }
            })
            .then((response) => {
                setCategories(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                navigate("/")
            })
    }, [])

    return (
        <div>
            <CategoryTree data={categories} />
        </div>
    )
}

export default Category