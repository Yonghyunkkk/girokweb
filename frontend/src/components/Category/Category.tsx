import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { CategoryTree } from './CategoryTree'
import AddCategoryForm from './AddCategoryForm';

const baseURL = import.meta.env.VITE_BASE_URL;

const Category = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState({});

    const fetchCategoryData = async () => {
        const response = await axios.request({
            method: "get",
            url: `${baseURL}/categories`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("user-token"),
            },
        });
        setCategories(response.data);
    };

    useEffect(() => {
        fetchCategoryData().catch((error) => {
            navigate("/");
        });
    }, []);

    const handleAddCategory = async (categoryPath: string[]) => {
        console.log("Category Path: ", categoryPath);
        const requestBody = {
            "color": "orange",
            "names": categoryPath,
        };

        try {
            await axios.request({
                method: "POST",
                url: `${baseURL}/categories`,
                data: requestBody,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("user-token"),
                },
            });

            // Fetch the updated categories after adding the new category
            fetchCategoryData();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategoryData().catch((error) => {
            navigate("/");
        });
    }, []);

    return (
        <div>
            <CategoryTree data={categories} onUpdate={fetchCategoryData} />
            <AddCategoryForm onAddCategory={handleAddCategory} />
        </div>
    )
}

export default Category