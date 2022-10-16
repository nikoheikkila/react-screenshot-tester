interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <header className={className}>
            <h1>React Screenshot Tester</h1>
            <p>
                Click the button below to save the graph as an image file to disk. Alternatively, right-click on any
                part of this web page to open a context menu. The image will be saved into your browser's configured
                download directory.
            </p>
            <p>
                See the source code at{' '}
                <a href="https://github.com/nikoheikkila/react-screenshot-tester" target="blank">
                    GitHub
                </a>
                .
            </p>
        </header>
    );
};

export default Header;
