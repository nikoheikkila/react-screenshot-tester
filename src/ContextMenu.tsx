import React, { ReactNode, useEffect, useState } from 'react';

interface ContextMenuProps {
    children: ReactNode | ReactNode[];
    className?: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ className, children }) => {
    const [x, setX] = useState<string>('0px');
    const [y, setY] = useState<string>('0px');
    const [show, setShow] = useState<boolean>(false);

    const handleClick = (event: MouseEvent) => {
        if (show) setShow(false);
    };

    const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        const { pageX, pageY } = event;

        setX(`${pageX}px`);
        setY(`${pageY}px`);
        setShow(true);
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    });

    if (!show) return null;

    return (
        <ul
            className={className}
            style={{
                position: 'absolute',
                top: y,
                left: x,
            }}
        >
            {children}
        </ul>
    );
};

export default ContextMenu;
