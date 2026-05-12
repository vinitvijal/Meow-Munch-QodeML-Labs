import { defineRouteConfig } from "@medusajs/admin-sdk"
import {
  Container as MedusaContainer,
  Heading as MedusaHeading,
  Text as MedusaText,
  Table as MedusaTable,
  StatusBadge,
  Badge as MedusaBadge
} from "@medusajs/ui"

const Container = MedusaContainer as any
const Heading = MedusaHeading as any
const Text = MedusaText as any
const Table = MedusaTable as any
const Badge = MedusaBadge as any
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"
import { Heart } from "@medusajs/icons"

const WishlistsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-wishlists"],
    queryFn: () => sdk.client.fetch<{ wishlists: any[], count: number }>("/admin/wishlists"),
  })

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["admin-wishlists-stats"],
    queryFn: () => sdk.client.fetch<{ top_products: any[] }>("/admin/wishlists/stats"),
  })

  return (
    <Container className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Wishlists</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            View and manage customer wishlists.
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Container className="p-0 overflow-hidden">
          <div className="px-6 py-4 border-b">
            <Heading level="h2">Top Wishlisted Products</Heading>
          </div>
          <div className="px-6 py-4">
            {isLoadingStats ? (
              <Text>Loading stats...</Text>
            ) : (
              <div className="flex flex-col gap-y-2">
                {stats?.top_products?.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                      {product.thumbnail && (
                        <img src={product.thumbnail} alt={product.title} className="w-8 h-8 rounded-sm object-cover" />
                      )}
                      <Text size="small" weight="plus">{product.title}</Text>
                    </div>
                    <Badge size="small">{product.count} wishlists</Badge>
                  </div>
                ))}
                {stats?.top_products?.length === 0 && (
                  <Text size="small" className="text-ui-fg-subtle">No wishlisted products yet.</Text>
                )}
              </div>
            )}
          </div>
        </Container>
      </div>

      {isLoading ? (
        <Text>Loading wishlists...</Text>
      ) : isError ? (
        <Text className="text-ui-fg-error">Error loading wishlists.</Text>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Customer ID</Table.HeaderCell>
              <Table.HeaderCell>Items Count</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.wishlists?.map((wishlist) => (
              <Table.Row key={wishlist.id}>
                <Table.Cell>
                  <Text size="small" weight="plus">
                    {wishlist.id}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="small">
                    {wishlist.customer_id || "Guest"}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge size="small">
                    {wishlist.items?.length || 0} items
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text size="small">
                    {new Date(wishlist.created_at).toLocaleDateString()}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))}
            {data?.wishlists?.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={4} className="text-center py-8">
                  <Text size="small" className="text-ui-fg-subtle">No wishlists found.</Text>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Wishlists",
  icon: Heart,
})

export default WishlistsPage
