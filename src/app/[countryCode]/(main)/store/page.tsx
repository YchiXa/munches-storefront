// src/app/[countryCode]/(main)/store/page.tsx
import { Metadata } from "next"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Магазин",
  description: "Просмотрите все наши товары",
}

// Опишите правильно аргументы — НЕ Promise, а plain object
type StorePageProps = {
  params: Promise<{
    countryCode: string
  }>
  searchParams: Promise<{
    page?: string
    category?: string
  }>
}

export default async function StorePage({
  params,
  searchParams,
}: StorePageProps) {
  const { countryCode } = await params
  const resolvedSearchParams = await searchParams
  // парсим номер страницы, если он есть
  const page = parseInt(resolvedSearchParams.page ?? "1", 10)
  // выбранная категория из ?category=<id>
  const categoryId = resolvedSearchParams.category

  return (
    <StoreTemplate
      page={page.toString()} /* или передайте number, если StoreTemplate умеет его */
      countryCode={countryCode}
      categoryId={categoryId} /* новый проп */
    />
  )
}

// Добавляем ISR для ревалидации
export const revalidate = 0
