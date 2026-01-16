import { useRef, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
const PAGE_WIDTH = 816
const LEAST_GAP = 100
const INIT_POSITION = 56
const markers = Array.from({ length: 83 }, (_, i) => i)//[0, 1, 2, 3, 4, 5, ..., 80, 81, 82]
export const Ruler = () => {
    const [leftMargin, setLeftMargin] = useState<number>(56)
    const [rightMargin, setRightMargin] = useState<number>(56)
    const [isDraggingLeft, setIsDraggingLeft] = useState<boolean>(false)
    const [isDraggingRight, setIsDraggingRight] = useState<boolean>(false)
    const rulerRef = useRef<HTMLDivElement>(null)

    const handleLeftMouseDown = () => {
        setIsDraggingLeft(true)
    }
    const handleRightMouseDown = () => {
        setIsDraggingRight(true)
    }
    const handleMouseMove = (e: React.MouseEvent) => {
        if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
            const container = rulerRef.current.querySelector('#ruler-container')
            //calculate position relative to container(max left and max right position)
            if (container) {
                const containerRect = container.getBoundingClientRect()
                const relativeX = e.clientX - containerRect.left
                const rawPosition = Math.max(0, Math.min(relativeX, PAGE_WIDTH))

                if (isDraggingLeft) {
                    const maxLeftPosition = PAGE_WIDTH - rightMargin - LEAST_GAP; // ensure at least 100px gap
                    const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
                    setLeftMargin(newLeftPosition)
                } else if (isDraggingRight) {
                    const maxRightPosition = PAGE_WIDTH - (leftMargin + LEAST_GAP);
                    const newRightPosition = Math.max(0, PAGE_WIDTH - rawPosition);
                    const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition)
                    setRightMargin(constrainedRightPosition)
                }
            }
        }
    }
    const handleMouseUp = () => {
        setIsDraggingLeft(false)
        setIsDraggingRight(false)
    }
    const handleLeftDoubleClick = () => {
        setLeftMargin(INIT_POSITION)
    }
    const handleRightDoubleClick = () => {
        setRightMargin(INIT_POSITION)
    }
    return (
        <div
            className={`w-[${PAGE_WIDTH}px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden`}
            ref={rulerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
                id="ruler-container"
                className={`w-full h-full relative`}
            >
                {/* drag stuff */}
                <Markers
                    position={leftMargin}
                    isLeft={true}
                    isDragging={isDraggingLeft}
                    onDoubleClick={handleLeftDoubleClick}
                    onMouseDown={handleLeftMouseDown}
                ></Markers>
                <Markers
                    position={rightMargin}
                    isLeft={false}
                    isDragging={isDraggingRight}
                    onDoubleClick={handleRightDoubleClick}
                    onMouseDown={handleRightMouseDown}
                ></Markers>
                {/* scale */}
                <div className="absolute inset-x-0 bottom-0 h-full">
                    <div className={`relative h-full w-max-[${PAGE_WIDTH}px]`}>
                        {markers.map((marker) => {
                            const position = (marker * PAGE_WIDTH) / 82
                            return (
                                <div
                                    key={marker}
                                    className="absolute bottom-0"
                                    style={{ left: `${position}px` }}
                                >
                                    {
                                        marker % 10 === 0 && (
                                            <>
                                                <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500"></div>
                                                <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                                                    {marker / 10 + 1}
                                                </span>
                                            </>
                                        )
                                    }
                                    {
                                        marker % 5 === 0 && marker % 10 !== 0 && (
                                            <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500"></div>
                                        )
                                    }
                                    {
                                        marker % 5 !== 0 && (
                                            <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500"></div>
                                        )
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
interface MarkerProps {
    position: number;
    isLeft: boolean;
    isDragging: boolean;
    onMouseDown: () => void;
    onDoubleClick: () => void;
}
const Markers = ({
    position,
    isLeft,
    isDragging,
    onMouseDown,
    onDoubleClick,
}: MarkerProps) => {
    return (
        <div
            className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
            style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
        >
            <FaCaretDown className='absolute left-1/2 top-0 h-full fill-blue-300 transform -translate-x-1/2' />
            <div className='absolute left-1/2 top-4 transform -translate-x-1/2 transition-opacity duration-150'
                style={{
                    height: '100vh',
                    width: '0',
                    transform: 'scaleX(0.5)',
                    borderLeft: '1px dashed #3b72f6',
                    display: isDragging ? "block" : "none"
                }}
            >
            </div>
        </div>
    )
}