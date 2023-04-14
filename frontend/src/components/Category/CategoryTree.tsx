import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { ContextMenu } from "./ContextMenu";
import CategoryDragItem from "./CategoryDragItem";
import CategoryDropTarget from "./CategoryDropTarget";

const baseURL = import.meta.env.VITE_BASE_URL;

interface Category {
    subcategories: Record<string, Category>;
    color: string;
}

interface CategoryTreeProps {
    data: Record<string, Category>;
    onUpdate: () => void;
    onMoveCategory: (srcPath: string[], destPath: string[]) => void;
}

interface CategoryNodeProps {
    label: string;
    category: Category;
    level: number;
    fullPath: string;
    onDataChange: () => void;
    onMoveCategory: (srcPath: string[], destPath: string[]) => void;
}

const CategoryNode: FC<CategoryNodeProps> = ({ label, category, level, fullPath, onDataChange, onMoveCategory }) => {

    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
    } | null>(null);

    useEffect(() => { // close contextMenu when user clicks sth else
        if (contextMenu) {
            const handleClickOutside = (event: MouseEvent) => {
                handleCloseContextMenu();
            };
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [contextMenu]);

    const hasSubcategories = Object.keys(category.subcategories).length > 0;

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY });
    };

    const handleDelete = async () => {
        setContextMenu(null);

        const requestBody = {
            "cats": fullPath.split("/")
        }

        const response = await axios.request({
            method: 'DELETE',
            url: `${baseURL}/categories`,
            data: requestBody,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("user-token")
            }
        })
            .then((response) => {
                console.log(response)
                onDataChange();
            })
            .catch((error) => {
                console.log(error)
            })
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleDrop = (item: any) => {
        const srcPath = item.id.split("/");
        const destPath = fullPath.split("/");

        onMoveCategory(srcPath, destPath);
    };


    return (
        <>
            <CategoryDropTarget type="category" onDrop={handleDrop}>
                <CategoryDragItem type="category" id={fullPath}>
                    <div
                        onContextMenu={handleContextMenu}
                        style={{
                            marginLeft: level * 20,
                            color: category.color,
                            fontWeight: hasSubcategories ? 'bold' : 'normal',
                        }}
                    >
                        {label}
                    </div>
                </CategoryDragItem>
            </CategoryDropTarget>
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onDelete={handleDelete}
                />
            )}
            {hasSubcategories &&
                Object.entries(category.subcategories).map(([key, subcategory]) => (
                    <CategoryNode
                        key={key}
                        label={key}
                        category={subcategory}
                        level={level + 1}
                        fullPath={`${fullPath}/${key}`}
                        onDataChange={onDataChange}
                        onMoveCategory={onMoveCategory}
                    />
                ))}
            {contextMenu && <div onClick={handleCloseContextMenu} />}
        </>
    );
};

export const CategoryTree: FC<CategoryTreeProps> = ({ data, onUpdate, onMoveCategory }) => {
    return (
        <>
            {Object.entries(data).map(([key, category]) => (
                <CategoryNode key={key} label={key} category={category} level={0} fullPath={key} onDataChange={onUpdate} onMoveCategory={onMoveCategory} />
            ))}
        </>
    );
};
