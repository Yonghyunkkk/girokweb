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
<<<<<<< HEAD
                placeholder="Enter new category (e.g. HKU/COMP3354)"
=======
                placeholder="Enter new category"
>>>>>>> cd479a708c80070b8c14c515622278563f89fd1e
            />
            <button type="submit">Add Category</button>
        </form>
    );
};

export default AddCategoryForm;
