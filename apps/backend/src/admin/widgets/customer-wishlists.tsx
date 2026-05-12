import { defineWidgetConfig } from "@medusajs/admin-sdk"
import * as MedusaUI from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../lib/sdk"
import { DetailWidgetProps } from "@medusajs/framework/types"

const Container: any = MedusaUI.Container
const Heading: any = MedusaUI.Heading
const Text: any = MedusaUI.Text
const Table: any = MedusaUI.Table
const Badge: any = MedusaUI.Badge

const CustomerWishlistsWidget = ({ data: customer }: DetailWidgetProps<any>) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["customer-wishlists", customer.id],
    queryFn: () => sdk.client.fetch<{ wishlists: any[] }>(`/admin/wishlists?customer_id=${customer.id}`),
  })

  if (!isLoading && (!data?.wishlists || data.wishlists.length === 0)) {
    return null
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Wishlists</Heading>
      </div>
      <div className="px-6 py-4">
        {isLoading ? (
          <Text>Loading wishlists...</Text>
        ) : isError ? (
          <Text className="text-ui-fg-error">Error loading wishlists.</Text>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Items</Table.HeaderCell>
                <Table.HeaderCell>Created At</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data?.wishlists?.map((wishlist: any) => (
                <Table.Row key={wishlist.id}>
                  <Table.Cell>
                    <Text size="small" weight="plus">
                      {wishlist.id}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-wrap gap-1">
                      {wishlist.items?.map((item: any) => (
                        <Badge key={item.id} size="small" className="max-w-[200px] truncate">
                          {item.product_variant?.product?.title || "Unknown Product"}
                        </Badge>
                      ))}
                      {(!wishlist.items || wishlist.items.length === 0) && (
                        <Text size="small" className="text-ui-fg-subtle">No items</Text>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="small">
                      {new Date(wishlist.created_at).toLocaleDateString()}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "customer.details.after",
})

export default CustomerWishlistsWidget
