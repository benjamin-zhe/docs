import { useState } from 'react'
import { useEditorStore } from '@/store/use-editor-store'
import { cn } from '@/lib/utils'

const GRID_SIZE = 10

export const TableSelector = () => {
    const { editor } = useEditorStore()
    const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)
    const [withHeaderRow, setWithHeaderRow] = useState(false)
    const [customSize, setCustomSize] = useState<{ rows: number; cols: number } | null>(null)

    const handleMouseEnter = (row: number, col: number) => {
        setHoveredCell({ row, col })
        setCustomSize(null)
    }

    const handleMouseLeave = () => {
        setHoveredCell(null)
    }

    const handleClick = (row: number, col: number) => {
        if (row === 0 && col === 0) return

        editor?.chain().focus().insertTable({ rows: row, cols: col, withHeaderRow }).run()
        setHoveredCell(null)
    }

    const isCellHovered = (row: number, col: number) => {
        if (hoveredCell) {
            return row <= hoveredCell.row && col <= hoveredCell.col
        }
        if (customSize) {
            return row < customSize.rows && col < customSize.cols
        }
        return false
    }

    const handleInputChange = (field: 'rows' | 'cols', value: string) => {

        const num = Number(value)

        // 空值时不处理，允许清空输入
        if (value === '') {
            setCustomSize(null)
            setHoveredCell(null)
            return
        }
        if (!/^\d+$/.test(value)) return

        // 超过最大值限制时不更新
        if (num > GRID_SIZE) return

        // 限制最小值为 1
        const clampedNum = num <= 0 ? 1 : num

        setCustomSize(prev => ({
            rows: field === 'rows' ? clampedNum : prev?.rows || 3,
            cols: field === 'cols' ? clampedNum : prev?.cols || 3
        }))
        setHoveredCell(null)
    }

    const getDisplayText = () => {
        if (hoveredCell) {
            return `${hoveredCell.row + 1} x ${hoveredCell.col + 1} Table`
        }
        if (customSize) {
            return `${customSize.rows} x ${customSize.cols} Table`
        }
        return 'Select Table Size'
    }

    return (
        <div className="p-3">
            <div className="text-sm mb-2 text-muted-foreground">
                {getDisplayText()}
            </div>
            <div
                className="grid gap-0.5"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, min-content)` }}
                onMouseLeave={handleMouseLeave}
            >
                {Array.from({ length: GRID_SIZE }).map((_, rowIndex) =>
                    Array.from({ length: GRID_SIZE }).map((_, colIndex) => {
                        const isHovered = isCellHovered(rowIndex, colIndex)
                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={cn(
                                    'w-6 h-6 rounded-sm border border-neutral-200 cursor-pointer transition-colors',
                                    isHovered ? 'bg-blue-500 border-blue-500' : 'bg-neutral-100 hover:bg-neutral-200'
                                )}
                                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                onClick={() => handleClick(rowIndex, colIndex)}
                            />
                        )
                    })
                )}
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-200 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Custom size:</span>
                    <input
                        type="number"
                        min="1"
                        max={GRID_SIZE}
                        value={customSize?.rows ?? 3}
                        className="w-16 px-2 py-1 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        id="table-rows"
                        placeholder="Rows"
                        onChange={(e) => handleInputChange('rows', e.target.value)}
                        onFocus={() => setHoveredCell(null)}
                    />
                    <span className="text-muted-foreground">x</span>
                    <input
                        type="number"
                        min="1"
                        max={GRID_SIZE}
                        value={customSize?.cols ?? 3}
                        className="w-16 px-2 py-1 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        id="table-cols"
                        placeholder="Cols"
                        onChange={(e) => handleInputChange('cols', e.target.value)}
                        onFocus={() => setHoveredCell(null)}
                    />
                    <button
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        onClick={() => {
                            const rows = customSize?.rows ?? 3
                            const cols = customSize?.cols ?? 3
                            editor?.chain().focus().insertTable({ rows, cols, withHeaderRow }).run()
                        }}
                    >
                        Insert
                    </button>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <label htmlFor="header-toggle" className="text-muted-foreground cursor-pointer select-none">Include header row</label>
                    <button
                        id="header-toggle"
                        type="button"
                        role="switch"
                        aria-checked={withHeaderRow}
                        onClick={() => setWithHeaderRow(!withHeaderRow)}
                        className={cn(
                            'relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                            withHeaderRow ? 'bg-blue-500' : 'bg-neutral-300'
                        )}
                    >
                        <span
                            className={cn(
                                'absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform shadow-sm',
                                withHeaderRow ? 'translate-x-5' : 'translate-x-0'
                            )}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
