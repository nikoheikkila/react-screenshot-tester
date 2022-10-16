interface CaptureButtonProps {
    onClick: () => void;
    className?: string;
}

const CaptureButton: React.FC<CaptureButtonProps> = ({ onClick, className }) => {
    return (
        <button className={className} onClick={onClick}>
            Save to Disk
        </button>
    );
}

export default CaptureButton;
