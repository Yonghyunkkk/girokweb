import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { ContextMenu } from "./ContextMenu";

const baseURL = import.meta.env.VITE_BASE_URL;

interface Category {
    subcategories: Record<string, Category>;
    color: string;
}

interface CategoryTreeProps {
    data: Record<string, Category>;
    onUpdate: () => void;
}

interface CategoryNodeProps {
    label: string;
    category: Category;
    level: number;
    fullPath: string;
    onDataChange: () => void;
}

const CategoryNode: FC<CategoryNodeProps> = ({ label, category, level, fullPath, onDataChange }) => {

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

    return (
        <>
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
                    />
                ))}
            {contextMenu && <div onClick={handleCloseContextMenu} />}
        </>
    );
};

export const CategoryTree: FC<CategoryTreeProps> = ({ data, onUpdate }) => {
    return (
        <>
            {Object.entries(data).map(([key, category]) => (
                <CategoryNode key={key} label={key} category={category} level={0} fullPath={key} onDataChange={onUpdate} />
            ))}
        </>
    );
};
