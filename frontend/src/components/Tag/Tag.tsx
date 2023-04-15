import React, { useEffect, useState } from 'react';
import './Tag.css';

const baseURL = import.meta.env.VITE_BASE_URL;

interface TagProps {
    tags: string[];
}

const Tag: React.FC<TagProps> = ({ tags }) => {
    return (
        <div>
            <h3>Tags</h3>
            <div className="tag-container">
                {tags.map((tag) => (
                    <span key={tag} className="tag">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Tag;
