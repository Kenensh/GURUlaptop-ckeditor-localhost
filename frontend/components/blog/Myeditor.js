import React from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div>載入編輯器中...</div>,
})

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean'],
  ],
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('image', file)

        fetch('http://localhost:3005/api/blog/upload-image', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            resolve(result.file.url)
          })
          .catch((error) => {
            reject('圖片上傳失敗')
          })
      })
    },
  },
}

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'align',
  'list',
  'bullet',
  'blockquote',
  'code-block',
  'link',
  'image',
]

function Myeditor({ value, onChange }) {
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <ReactQuill
      theme="snow"
      value={value || ''}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder="請輸入內容..."
    />
  )
}

export default Myeditor
