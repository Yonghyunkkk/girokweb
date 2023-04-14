import React, { FC } from 'react';

interface ContextMenuProps {
    x: number;
    y: number;
    onDelete: () => void;
}

export const ContextMenu: FC<ContextMenuProps> = ({ x, y, onDelete }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: y,
                left: x,
                backgroundColor: 'white',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: 4,
                zIndex: 1000,
                minWidth: 100,
                padding: 8,
            }}
        >
            <div
                style={{
                    cursor: 'pointer',
                    padding: '4px 8px',
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={onDelete}


            >
                Delete
            </div>
        </div>
    );
};
