'use client'

import { useEffect, useRef } from 'react'
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
  diffSourcePlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  type MDXEditorMethods,
} from '@mdxeditor/editor'

interface ArticleMarkdownEditorProps {
  markdown: string
  onChange: (markdown: string) => void
  onBlur?: () => void
}

export const ArticleMarkdownEditor = ({
  markdown,
  onChange,
  onBlur,
}: ArticleMarkdownEditorProps) => {
  const editorRef = useRef<MDXEditorMethods>(null)
  const lastMarkdownRef = useRef(markdown)

  useEffect(() => {
    if (markdown !== lastMarkdownRef.current) {
      editorRef.current?.setMarkdown(markdown)
      lastMarkdownRef.current = markdown
    }
  }, [markdown])

  return (
    <div
      className="article-editor overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
      onBlur={onBlur}
    >
      <MDXEditor
        ref={editorRef}
        markdown={markdown}
        onChange={(value) => {
          lastMarkdownRef.current = value
          onChange(value)
        }}
        placeholder="Mulai menulis ceritamu di sini..."
        contentEditableClassName="min-h-[400px] px-4 py-4 text-base leading-8 text-gray-900 outline-none dark:text-gray-100"
        className="dark:bg-gray-900"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          markdownShortcutPlugin(),
          diffSourcePlugin({ viewMode: 'rich-text' }),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper options={['rich-text', 'source']}>
                <UndoRedo />
                <BlockTypeSelect />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <ListsToggle options={['bullet', 'number']} />
                <CreateLink />
                <InsertTable />
                <InsertThematicBreak />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
    </div>
  )
}
