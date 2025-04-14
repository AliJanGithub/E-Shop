import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Url } from '../../contant'
import { useNavigate } from 'react-router-dom'

type ProductMeta = {
  name: string
  description: string
  price: number
  category: string
  stock: number
}

function CreateProduct() {
  const [productMeta, setProductMeta] = useState<ProductMeta>({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
  })

  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductMeta(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }))
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setImages(Array.from(files))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const user = localStorage.getItem('user')
    const usercheck = user ? JSON.parse(user) : null
    const token = usercheck?.token

    const formData = new FormData()
    formData.append('name', productMeta.name)
    formData.append('description', productMeta.description)
    formData.append('price', productMeta.price.toString())
    formData.append('category', productMeta.category)
    formData.append('stock', productMeta.stock.toString())

    images.forEach((image) => {
      formData.append('images', image) // 'images' should match multer field name
    })

    try {
      const res = await fetch(`${Url}/product/upload`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        alert('✅ Product created!')
        navigate('/')
      } else {
        alert('❌ Failed to create product.')
      }
    } catch (err) {
      console.error(err)
      alert('🚫 Error occurred while submitting product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Product Name"
          value={productMeta.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={productMeta.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={productMeta.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="category"
          type="text"
          placeholder="Category"
          value={productMeta.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={productMeta.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="w-full"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}

export default CreateProduct
