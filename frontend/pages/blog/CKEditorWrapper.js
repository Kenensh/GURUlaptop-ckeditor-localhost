import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

function CKEditorWrapper({ onChange, name, value }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'imageUpload',
          'blockQuote',
          'insertTable',
          'undo',
          'redo',
        ],
        language: 'zh',
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        onChange(data)
      }}
    />
  )
}

export default CKEditorWrapper
