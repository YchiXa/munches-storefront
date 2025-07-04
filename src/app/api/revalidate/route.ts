// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(req: NextRequest) {
  const url = req.nextUrl
  const tags = url.searchParams.get("tags")
  const secret = url.searchParams.get("secret")

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
  }
  if (!tags) {
    return NextResponse.json({ error: "No tags" }, { status: 400 })
  }

  const tagsArray = tags.split(",")

  await Promise.all(
    tagsArray.map(async (tag) => {
      // 1) Всегда обновляем страницу списка товаров
      if (tag === "products") {
        revalidatePath("/dk/(main)/store", "page")
        return
      }

      // 2) Конкретная страница товара по handle
      if (tag.startsWith("product-")) {
        const id = tag.replace("product-", "")
        const medusa = process.env.MEDUSA_BACKEND_URL!
        const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!

        const res = await fetch(`${medusa}/store/products/${id}`, {
          headers: {
            "x-publishable-api-key": key,
            accept: "application/json",
            "content-type": "application/json",
          },
        })
        if (!res.ok) return
        const { product } = await res.json()
        revalidatePath(`/dk/products/${product.handle}`, "page")
        return
      }

      // 3) Обновление всех коллекций
      if (tag === "collections") {
        revalidatePath("/dk/(main)/store", "page") // или /dk/(main)/collections
        return
      }

      // 4) Конкретная коллекция
      if (tag.startsWith("collection-")) {
        const id = tag.replace("collection-", "")
        // тут вам, как и с продуктом, возможно, нужно будет получить handle или slug:
        const medusa = process.env.MEDUSA_BACKEND_URL!
        const key = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!
        const res = await fetch(`${medusa}/store/collections/${id}`, {
          headers: {
            "x-publishable-api-key": key,
            accept: "application/json",
            "content-type": "application/json",
          },
        })
        if (!res.ok) return
        const { collection } = await res.json()
        revalidatePath(`/dk/collections/${collection.handle}`, "page")
        return
      }
    })
  )

  return NextResponse.json({ message: "Revalidated" }, { status: 200 })
}
