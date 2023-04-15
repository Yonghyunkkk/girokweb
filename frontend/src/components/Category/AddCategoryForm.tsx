import React, { useState } from "react";

interface AddCategoryFormProps {
    onAddCategory: (categoryPath: string[]) => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onAddCategory }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Split the input value into an array of strings by "/"
        const categoryPath = inputValue.split("/");
        onAddCategory(categoryPath);
        setInputValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Enter new category"
            />
            <button type="submit">Add Category</button>
        </form>
    );
};

export default AddCategoryForm;
