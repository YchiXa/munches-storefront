// src/app/api/revalidate/route.ts

import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(req: NextRequest) {
  const url = req.nextUrl
  const secret = url.searchParams.get("secret")
  const tags = url.searchParams.get("tags")
  const countryCode = url.searchParams.get("countryCode") || "ru"

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
  }
  if (!tags) {
    return NextResponse.json({ error: "No tags provided" }, { status: 400 })
  }

  const tagsArray = tags.split(",")

  console.log("[revalidate] tags:", tagsArray, "countryCode:", countryCode)
  console.log("[revalidate] secret:", secret ? "SET" : "NOT SET")

  const revalidatedPaths: string[] = []

  await Promise.all(
    tagsArray.map((tag) => {
      // Товары
      if (tag === "products") {
        const path = `/${countryCode}/store`
        console.log("[revalidate] store list:", path)
        revalidatePath(path)
        revalidatedPaths.push(path)
      } else if (tag.startsWith("product-")) {
        const handle = tag.replace("product-", "")
        const path = `/${countryCode}/products/${handle}`
        console.log("[revalidate] product page:", path)
        revalidatePath(path)
        revalidatedPaths.push(path)
      }

      // Коллекции
      else if (tag === "collections") {
        const paths = [`/${countryCode}/store`, `/${countryCode}`]
        paths.forEach((path) => {
          console.log("[revalidate] collections list:", path)
          revalidatePath(path)
          revalidatedPaths.push(path)
        })
      } else if (tag.startsWith("collection-")) {
        const paths = [`/${countryCode}/store`, `/${countryCode}`]
        paths.forEach((path) => {
          console.log("[revalidate] collection page:", path)
          revalidatePath(path)
          revalidatedPaths.push(path)
        })
      }

      // Категории
      else if (tag === "categories") {
        const path = `/${countryCode}/store`
        console.log("[revalidate] categories list (store):", path)
        revalidatePath(path)
        revalidatedPaths.push(path)
      } else if (tag.startsWith("category-")) {
        const handle = tag.replace("category-", "")
        const path = `/${countryCode}/categories/${handle}`
        console.log("[revalidate] category page:", path)
        revalidatePath(path)
        revalidatedPaths.push(path)
      }

      // Общие страницы
      else if (tag === "general") {
        const paths = [`/${countryCode}`, `/${countryCode}/store`]
        paths.forEach((path) => {
          console.log("[revalidate] general page:", path)
          revalidatePath(path)
          revalidatedPaths.push(path)
        })
      }

      // Checkout страницы
      else if (tag === "checkout") {
        const paths = [
          `/${countryCode}/checkout`,
          `/${countryCode}/(checkout)/checkout`,
        ]
        paths.forEach((path) => {
          console.log("[revalidate] checkout page:", path)
          revalidatePath(path)
          revalidatedPaths.push(path)
        })
      }

      // Заказы
      else if (tag.startsWith("order-")) {
        const orderId = tag.replace("order-", "")
        const path = `/${countryCode}/order/${orderId}`
        console.log("[revalidate] order page:", path)
        revalidatePath(path)
        revalidatedPaths.push(path)
      }

      return Promise.resolve()
    })
  )

  console.log("[revalidate] ✅ Revalidated paths:", revalidatedPaths)

  return NextResponse.json(
    {
      message: "Revalidation triggered",
      revalidatedPaths,
      tags: tagsArray,
    },
    { status: 200 }
  )
}
