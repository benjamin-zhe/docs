import { Extension } from "@tiptap/react";
import '@tiptap/extension-text-style'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        lineHeight: {
            setLineHeight: (lineHeight: string) => ReturnType;
            unsetLineHeight: () => ReturnType;
        }
    }
}
export const LineHeightExtension = Extension.create({
    name: 'lineHeight',
    addOptions() {
        return {
            //lineHeight change dom construction,use for all p or h
            types: ["paragraph", "heading"],
            defaultLineHeight: 'normal'
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: this.options.defaultLineHeight,
                        parseHTML: element => element.style.lineHeight || this.options.defaultLineHeight,
                        renderHTML: attributes => {
                            if (!attributes.lineHeight) {
                                return {}
                            }
                            return {
                                style: `line-height:${attributes.lineHeight}`
                            }
                        }
                    }
                }
            }
        ]
    },
    addCommands() {
        return {
            setLineHeight: (lineHeight: string) => ({ tr, state, dispatch }) => {
                const { selection } = state
                tr = tr.setSelection(selection)
                const { from, to } = selection
                state.doc.nodesBetween(from, to, (node, pos) => {
                    if (this.options.types.includes(node.type.name)) {
                        // setNodeMarkup(pos, ...)修改某个 node 的属性
                        // pos当前 node 在文档中的位置
                        // undefined node 类型不变（还是 paragraph / heading）
                        // { ...node.attrs, lineHeight }
                        // 保留原有属性
                        // 只覆盖 lineHeight
                        tr = tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            lineHeight,
                        })
                    }
                })
                if (dispatch) {
                    dispatch(tr)
                }
                return true
            },
            unsetLineHeight: () => ({ tr, state, dispatch }) => {
                const { selection } = state
                tr = tr.setSelection(selection)
                const { from, to } = selection
                state.doc.nodesBetween(from, to, (node, pos) => {
                    if (this.options.types.includes(node.type.name)) {
                        tr = tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            lineHeight: this.options.defaultLineHeight,
                        })
                    }
                })
                if (dispatch) {
                    dispatch(tr)
                }
                return true
            }
        }
    }
})