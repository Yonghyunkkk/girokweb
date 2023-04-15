import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CategoryTree } from "./CategoryTree";
import AddCategoryForm from "./AddCategoryForm";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Tag from "../Tag/Tag";

const baseURL = import.meta.env.VITE_BASE_URL;

const Category = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState({});
  const [tags, setTags] = useState<string[]>([]);

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

  const fetchTags = async () => {
    const response = await axios.request({
      method: "get",
      url: `${baseURL}/tasks/tags`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("user-token"),
      },
    });
    setTags(response.data.tags);
  };

  const handleAddCategory = async (categoryPath: string[]) => {
    console.log("Category Path: ", categoryPath);
    const requestBody = {
      names: categoryPath,
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

  const handleMoveCategory = async (srcPath: string[], destPath: string[]) => {
    const requestBody = {
      cats: srcPath,
      new_parent_cats: destPath,
    };

    try {
      await axios.request({
        method: "PATCH",
        url: `${baseURL}/categories/parent`,
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("user-token"),
        },
      });

      fetchCategoryData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryData().catch((error) => {
      navigate("/");
    });
    fetchTags().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <CategoryTree
          data={categories}
          onUpdate={fetchCategoryData}
          onMoveCategory={handleMoveCategory}
        />
      </DndProvider>
      <AddCategoryForm onAddCategory={handleAddCategory} />
      <Tag tags={tags} />
    </div>
  );
};

export default Category;
