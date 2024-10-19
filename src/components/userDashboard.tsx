"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { format, parseISO } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import UserProductList from "@/types/userProductList"

// Sample product data

 
export default function UserDashboard() {

const DEFAULT_PRODUCT = {
    qrlink: "",
    link: "",
    productName: "",
    productImages: "https://veirdo.in/cdn/shop/files/Artboard8.png?v=1724158576",
    productLink: "",
    createdAt: ""
}

  const [products, setProducts] = useState<UserProductList[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/user/userProductList')
      const data = res.data
      setProducts(data)
    }
    fetchProducts()
  }, [setProducts])

  useEffect(() => {
    console.log("products are ",products);
  }, [products])
  

  const { data: session } = useSession()
  const [selectedProduct, setSelectedProduct] = useState(DEFAULT_PRODUCT)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productQRLink, setProductQRLink] = useState("")

  const openProductModal = (product: UserProductList) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
    setProductQRLink("")
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(DEFAULT_PRODUCT)
  }

  const handleSaveNote = async () => {
    // Here you would typically save the note to your backend
    await axios.put('/api/user/changeLink', {
        qrlink: selectedProduct.qrlink,
        link: productQRLink
    })
    closeProductModal()
  }

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, "dd - MM - yyyy")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Profile Section */}
      <div className="mb-8 text-center">
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
          <Image
            src={session?.user?.image || ""}
            alt="User Avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h2 className="mt-4 text-2xl font-bold">{session?.user?.name || "User Name"}</h2>
        <p className="text-muted-foreground">{session?.user?.email || "user@example.com"}</p>
      </div>

      {/* Product Cards Section */}
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.qrlink} className="cursor-pointer" onClick={() => openProductModal(product)}>
              <CardContent className="p-4">
                <div className="relative aspect-square overflow-hidden rounded-md mb-4">
                  <Image 
                    src={product.productImages} 
                    alt={product.productName} 
                    layout="fill" 
                    objectFit="cover"
                  />
                </div>
                <div className="flex justify-between">
                <h3 className="font-semibold text-lg mb-2">{product.productName}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(product.createdAt)}
                </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>) : (
          <div className="flex justify-center items-center flex-col">
            <div>No Products Added</div>
            <br />
            <Button>Add Product</Button>
          </div>
        )
        }

      {/* Product Modal */}
      { selectedProduct &&
      <Dialog open={isModalOpen} onOpenChange={closeProductModal} >
        <DialogContent className="border border-solid border-primary rounded-lg dialog-width">
          <DialogHeader>
            <DialogTitle className="flex justify-center">Change QR link</DialogTitle>
            <DialogDescription>{`QR Link : ${selectedProduct?.qrlink}`}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image
                src={selectedProduct?.productImages || "/placeholder.svg"}
                alt={selectedProduct?.productName || "Product"}
                layout="fill"
              />
            </div>
            <div>
              <Label htmlFor="product-note">Change Link</Label>
              <Input
                id="product-note"
                value={productQRLink}
                onChange={(e) => setProductQRLink(e.target.value)}
                placeholder="Paste your new link here..."
              />
            </div>
            <Button onClick={handleSaveNote}>Save Link</Button>
          </div>
        </DialogContent>
      </Dialog>}
    </div>
  )
}