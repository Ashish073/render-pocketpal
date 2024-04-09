function Loader({ color, width, height }: { color?: string, width: string, height: string }) {
    return (
        <div style={{ height: `${height}px`, width: `${width}px` }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="100%" height="100%" style={{ shapeRendering: 'auto', display: 'block', background: 'transparent' }} xmlnsXlink="http://www.w3.org/1999/xlink">
                <g>
                    <circle cx="50" cy="50" r="32" strokeWidth="8" stroke={color || '#3399ff'} strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                    </circle>
                    <g></g>
                </g>
            </svg>
        </div>
    );
}

export default Loader;
