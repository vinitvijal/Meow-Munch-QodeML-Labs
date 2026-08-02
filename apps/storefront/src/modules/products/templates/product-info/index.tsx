import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { formatProductDescription } from "@modules/products/utils/format-description"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const descriptionParagraphs = formatProductDescription(product.description)

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-3xl leading-10 text-ui-fg-base"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        <div
          className="space-y-4 text-medium text-ui-fg-subtle leading-8"
          data-testid="product-description"
        >
          {descriptionParagraphs.length > 0 ? (
            descriptionParagraphs.map((paragraph, index) => (
              <Text key={index} className="text-medium text-ui-fg-subtle">
                {paragraph}
              </Text>
            ))
          ) : (
            <Text className="text-medium text-ui-fg-subtle">
              A curated product experience for your cat, designed to feel clear and complete.
            </Text>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
