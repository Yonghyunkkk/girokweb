import { useDrag } from "react-dnd";

interface CategoryDragItemProps {
    type: string;
    id: string;
    children: React.ReactNode;
}

const CategoryDragItem: React.FC<CategoryDragItemProps> = ({ type, id, children }) => {
    const [, drag] = useDrag(() => ({
        type,
        item: { id },
    }));

    return <div ref={drag}>{children}</div>;
};

export default CategoryDragItem;
