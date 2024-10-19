"use client"

import { useState } from "react"
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

// Sample product data
const products = [
  {
    id: 1,
    productName: "tshirt 1",
    productImages: "https://veirdo.in/cdn/shop/files/Artboard8.png?v=1724158576",
    productLink: "",
    createdAt: "2024-08-16T05:00:49.521Z"
  },
  {
    id: 2,
    productName: "tshirt 2",
    productImages: "https://veirdo.in/cdn/shop/files/Artboard8.png?v=1724158576",
    productLink: "",
    createdAt: "2024-08-17T05:00:49.521Z"
  },
  {
    id: 3,
    productName: "tshirt 3",
    productImages: "https://veirdo.in/cdn/shop/files/Artboard8.png?v=1724158576",
    productLink: "",
    createdAt: "2024-08-18T05:00:49.521Z"
  }
]

export default function UserDashboard() {
  const { data: session } = useSession()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productNote, setProductNote] = useState("")

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
    setProductNote("")
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleSaveNote = () => {
    // Here you would typically save the note to your backend
    console.log(`Saving note for product ${selectedProduct.productName}: ${productNote}`)
    closeProductModal()
  }

  const formatDate = (dateString) => {
    const date = parseISO(dateString)
    return format(date, "dd - MM - yyyy")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Profile Section */}
      <div className="mb-8 text-center">
        <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full">
          <Image
            src={session?.user?.image || "/placeholder.svg"}
            alt="User Avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h2 className="mt-4 text-2xl font-bold">{session?.user?.name || "User Name"}</h2>
        <p className="text-muted-foreground">{session?.user?.email || "user@example.com"}</p>
      </div>

      {/* Product Cards Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="cursor-pointer" onClick={() => openProductModal(product)}>
            <CardContent className="p-4">
              <div className="relative aspect-square overflow-hidden rounded-md mb-4">
                <Image 
                  src={product.productImages} 
                  alt={product.productName} 
                  layout="fill" 
                  objectFit="cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">{product.productName}</h3>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {formatDate(product.createdAt)}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeProductModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct?.productName}</DialogTitle>
            <DialogDescription>View and add notes to your product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image
                src={selectedProduct?.productImages || "/placeholder.svg"}
                alt={selectedProduct?.productName || "Product"}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="font-semibold text-lg">{selectedProduct?.productName}</h3>
            <p className="text-sm text-muted-foreground">
              {selectedProduct?.createdAt ? formatDate(selectedProduct.createdAt) : "Date not available"}
            </p>
            <div>
              <Label htmlFor="product-note">Product Note</Label>
              <Input
                id="product-note"
                value={productNote}
                onChange={(e) => setProductNote(e.target.value)}
                placeholder="Add a note about this product..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveNote}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}