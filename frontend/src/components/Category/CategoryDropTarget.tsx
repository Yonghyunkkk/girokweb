import { useDrop } from "react-dnd";

interface CategoryDropTargetProps {
    type: string;
    onDrop: (item: any) => void;
    children: React.ReactNode;
}

const CategoryDropTarget: React.FC<CategoryDropTargetProps> = ({ type, onDrop, children }) => {
    const [, drop] = useDrop(() => ({
        accept: type,
        drop: (item) => onDrop(item),
    }));

    return <div ref={drop}>{children}</div>;
};

export default CategoryDropTarget;
