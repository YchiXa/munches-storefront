import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

/**
 * Универсальный thumbnail‑компонент для баннеров.
 * Поддерживает **старые пропы** (`size`, `isFeatured`) для обратной совместимости
 * и новый проп `aspect` для произвольного соотношения сторон.
 *
 * Приоритет расчёта соотношения сторон:
 * 1. `aspect` (если передан)
 * 2. `isFeatured` → 11/14
 * 3. `size === "square"` → 1/1
 * 4. по умолчанию 16/9.
 */

type ThumbnailProps = {
  thumbnail?: string | null
  // TODO: уточнить типизацию картинок
  images?: any[] | null
  /**
   * Наследие старой версии. Управляет шириной и (частично) ratio.
   */
  size?: "small" | "medium" | "large" | "full" | "square"
  /**
   * Флаг из прошлой версии — менял ratio на 11/14.
   */
  isFeatured?: boolean
  /**
   * Tailwind‑класс aspect‑ratio (напр. "aspect-[2/1]"). Имеет приоритет над size/isFeatured.
   */
  aspect?: string
  className?: string
  "data-testid"?: string
}

const ThumbnailBanner: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "full",
  isFeatured,
  aspect,
  className,
  "data-testid": dataTestid,
}) => {
  const imgSrc = thumbnail || images?.[0]?.url

  // Соотношение сторон
  const ratioClass =
    aspect ||
    (isFeatured
      ? "aspect-[11/14]"
      : size === "square"
      ? "aspect-[1/1]"
      : "aspect-[16/9]")

  // Ширина по size (для inline-блоков, не влияет на grid/flex, если родитель задаёт ширину сам)
  const widthClass =
    size === "small"
      ? "w-[180px]"
      : size === "medium"
      ? "w-[290px]"
      : size === "large"
      ? "w-[440px]"
      : "w-full"

  return (
    <Container
      className={clx(
        "relative overflow-hidden bg-transparent rounded-large",
        ratioClass,
        widthClass,
        className
      )}
      data-testid={dataTestid}
    >
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt="Баннер"
          draggable={false}
          fill
          className="absolute inset-0 object-cover object-center"
          quality={70}
          sizes="(max-width: 640px) 100vw, 720px"
          priority
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-ui-bg-subtle">
          <PlaceholderImage size={size === "small" ? 16 : 24} />
        </div>
      )}
    </Container>
  )
}

export default ThumbnailBanner
