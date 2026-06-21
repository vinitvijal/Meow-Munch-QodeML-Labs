import { defineRouteConfig } from "@medusajs/admin-sdk"
import {
  Container as MedusaContainer,
  Heading as MedusaHeading,
  Text as MedusaText,
  Table as MedusaTable,
  Badge as MedusaBadge,
  Input as MedusaInput,
  Select as MedusaSelect,
  Button as MedusaButton,
  Drawer as MedusaDrawer,
  Label as MedusaLabel,
  StatusBadge,
  toast
} from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { sdk } from "../../lib/sdk"
import { Envelope } from "@medusajs/icons"

const Container = MedusaContainer as any
const Heading = MedusaHeading as any
const Text = MedusaText as any
const Table = MedusaTable as any
const Badge = MedusaBadge as any
const Input = MedusaInput as any
const Select = MedusaSelect as any
const Button = MedusaButton as any
const Drawer = MedusaDrawer as any
const Label = MedusaLabel as any

interface Ticket {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "open" | "pending" | "resolved"
  created_at: string
  updated_at: string
}

const SupportPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [pageLimit, setPageLimit] = useState(15)
  const [pageOffset, setPageOffset] = useState(0)

  // Drawer state
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [ticketStatus, setTicketStatus] = useState<string>("open")

  const queryClient = useQueryClient()

  // Display query: list of tickets with filters
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-tickets", searchTerm, statusFilter, pageLimit, pageOffset],
    queryFn: () =>
      sdk.client.fetch<{ tickets: Ticket[]; count: number }>("/admin/tickets", {
        query: {
          q: searchTerm || undefined,
          status: statusFilter || undefined,
          limit: pageLimit,
          offset: pageOffset,
        },
      }),
  })

  // Stats query (unfiltered list of tickets to calculate stats)
  const { data: statsData } = useQuery({
    queryKey: ["admin-tickets-stats"],
    queryFn: () =>
      sdk.client.fetch<{ tickets: Ticket[]; count: number }>("/admin/tickets", {
        query: {
          limit: 100, // Fetch up to 100 for stats calculation
        },
      }),
  })

  // Mutation to update ticket
  const updateTicketMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      sdk.client.fetch<{ ticket: Ticket }>(`/admin/tickets/${id}`, {
        method: "POST",
        body: { status },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-tickets"] })
      queryClient.invalidateQueries({ queryKey: ["admin-tickets-stats"] })
      toast.success("Ticket status updated successfully")
      setDrawerOpen(false)
      setSelectedTicket(null)
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update ticket")
    },
  })

  const handleOpenDrawer = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setTicketStatus(ticket.status)
    setDrawerOpen(true)
  }

  const handleSaveStatus = () => {
    if (!selectedTicket) return
    updateTicketMutation.mutate({
      id: selectedTicket.id,
      status: ticketStatus,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "orange"
      case "pending":
        return "blue"
      case "resolved":
        return "green"
      default:
        return "grey"
    }
  }

  // Calculate statistics
  const ticketsForStats = statsData?.tickets || []
  const totalCount = ticketsForStats.length
  const openCount = ticketsForStats.filter((t) => t.status === "open").length
  const pendingCount = ticketsForStats.filter((t) => t.status === "pending").length
  const resolvedCount = ticketsForStats.filter((t) => t.status === "resolved").length

  return (
    <Container className="flex flex-col gap-y-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Heading level="h1">Support Tickets</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Manage and resolve storefront customer support requests.
          </Text>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Container className="p-4 flex flex-col justify-between border border-ui-border-base rounded-xl bg-ui-bg-base shadow-sm">
          <Text size="small" className="text-ui-fg-subtle font-medium">Total Tickets</Text>
          <div className="flex items-baseline justify-between mt-2">
            <Heading level="h2" className="text-3xl font-bold">{totalCount}</Heading>
            <Badge size="small">All</Badge>
          </div>
        </Container>

        <Container className="p-4 flex flex-col justify-between border border-ui-border-base rounded-xl bg-ui-bg-base shadow-sm">
          <Text size="small" className="text-ui-fg-subtle font-medium">Open Tickets</Text>
          <div className="flex items-baseline justify-between mt-2">
            <Heading level="h2" className="text-3xl font-bold text-orange-500">{openCount}</Heading>
            <StatusBadge color="orange">Needs Action</StatusBadge>
          </div>
        </Container>

        <Container className="p-4 flex flex-col justify-between border border-ui-border-base rounded-xl bg-ui-bg-base shadow-sm">
          <Text size="small" className="text-ui-fg-subtle font-medium">Pending Tickets</Text>
          <div className="flex items-baseline justify-between mt-2">
            <Heading level="h2" className="text-3xl font-bold text-blue-500">{pendingCount}</Heading>
            <StatusBadge color="blue">In Progress</StatusBadge>
          </div>
        </Container>

        <Container className="p-4 flex flex-col justify-between border border-ui-border-base rounded-xl bg-ui-bg-base shadow-sm">
          <Text size="small" className="text-ui-fg-subtle font-medium">Resolved Tickets</Text>
          <div className="flex items-baseline justify-between mt-2">
            <Heading level="h2" className="text-3xl font-bold text-green-500">{resolvedCount}</Heading>
            <StatusBadge color="green">Completed</StatusBadge>
          </div>
        </Container>
      </div>

      {/* Filters and Search Bar */}
      <Container className="p-4 border border-ui-border-base rounded-xl bg-ui-bg-base flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button
            size="small"
            variant={statusFilter === null ? "primary" : "secondary"}
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          <Button
            size="small"
            variant={statusFilter === "open" ? "primary" : "secondary"}
            onClick={() => setStatusFilter("open")}
          >
            Open
          </Button>
          <Button
            size="small"
            variant={statusFilter === "pending" ? "primary" : "secondary"}
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </Button>
          <Button
            size="small"
            variant={statusFilter === "resolved" ? "primary" : "secondary"}
            onClick={() => setStatusFilter("resolved")}
          >
            Resolved
          </Button>
        </div>

        <div className="w-full sm:w-80">
          <Input
            size="small"
            type="search"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
        </div>
      </Container>

      {/* Main Table */}
      {isLoading ? (
        <Container className="p-8 flex items-center justify-center border rounded-xl min-h-80">
          <div className="flex flex-col items-center gap-y-2">
            <span className="animate-spin border-4 border-ui-border-base border-t-ui-fg-base rounded-full size-8" />
            <Text size="small" className="text-ui-fg-subtle">Loading tickets...</Text>
          </div>
        </Container>
      ) : isError ? (
        <Container className="p-8 flex items-center justify-center border border-ui-border-danger rounded-xl min-h-80">
          <Text className="text-ui-fg-error font-medium">Error loading support tickets. Please verify your backend server.</Text>
        </Container>
      ) : (
        <Container className="overflow-hidden border border-ui-border-base rounded-xl bg-ui-bg-base shadow-sm p-0">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Customer</Table.HeaderCell>
                <Table.HeaderCell>Subject</Table.HeaderCell>
                <Table.HeaderCell>Message Snippet</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Submitted At</Table.HeaderCell>
                <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data?.tickets?.map((ticket) => (
                <Table.Row key={ticket.id}>
                  <Table.Cell>
                    <div className="flex flex-col">
                      <Text size="small" weight="plus" className="text-ui-fg-base">
                        {ticket.name}
                      </Text>
                      <Text size="xsmall" className="text-ui-fg-subtle">
                        {ticket.email}
                      </Text>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge size="small" className="capitalize">
                      {ticket.subject}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="max-w-xs truncate">
                    <Text size="small" className="text-ui-fg-subtle truncate">
                      {ticket.message}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <StatusBadge color={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </StatusBadge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="small" className="text-ui-fg-subtle">
                      {new Date(ticket.created_at).toLocaleString()}
                    </Text>
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => handleOpenDrawer(ticket)}
                    >
                      View Details
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
              {data?.tickets?.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-y-1">
                      <Text size="small" weight="plus" className="text-ui-fg-base">No support tickets found</Text>
                      <Text size="small" className="text-ui-fg-subtle">Tickets submitted from the storefront will appear here.</Text>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>

          {/* Simple Pagination Footer */}
          {data?.count && data.count > pageLimit && (
            <div className="flex items-center justify-between border-t px-6 py-4">
              <Button
                size="small"
                variant="secondary"
                disabled={pageOffset === 0}
                onClick={() => setPageOffset(Math.max(0, pageOffset - pageLimit))}
              >
                Previous
              </Button>
              <Text size="small" className="text-ui-fg-subtle">
                Showing {pageOffset + 1} to {Math.min(pageOffset + pageLimit, data.count)} of {data.count}
              </Text>
              <Button
                size="small"
                variant="secondary"
                disabled={pageOffset + pageLimit >= data.count}
                onClick={() => setPageOffset(pageOffset + pageLimit)}
              >
                Next
              </Button>
            </div>
          )}
        </Container>
      )}

      {/* Ticket Details & Resolution Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Ticket Details</Drawer.Title>
            <Text size="xsmall" className="text-ui-fg-subtle font-mono mt-1">
              ID: {selectedTicket?.id}
            </Text>
          </Drawer.Header>

          <Drawer.Body className="flex-1 overflow-auto p-6 flex flex-col gap-y-6">
            {/* Customer Details Box */}
            <div className="border border-ui-border-base bg-ui-bg-subtle rounded-xl p-4 flex flex-col gap-y-3">
              <Heading level="h3" className="text-sm font-semibold">Customer Info</Heading>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text size="xsmall" className="text-ui-fg-subtle">Name</Text>
                  <Text size="small" weight="plus">{selectedTicket?.name}</Text>
                </div>
                <div>
                  <Text size="xsmall" className="text-ui-fg-subtle">Email</Text>
                  <Text size="small" weight="plus" className="break-all">{selectedTicket?.email}</Text>
                </div>
                <div>
                  <Text size="xsmall" className="text-ui-fg-subtle">Category/Subject</Text>
                  <Text size="small" className="capitalize">{selectedTicket?.subject}</Text>
                </div>
                <div>
                  <Text size="xsmall" className="text-ui-fg-subtle">Submitted Date</Text>
                  <Text size="small">
                    {selectedTicket && new Date(selectedTicket.created_at).toLocaleString()}
                  </Text>
                </div>
              </div>
            </div>

            {/* Ticket Message Box */}
            <div className="flex flex-col gap-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-ui-fg-subtle">Customer Message</Label>
              <div className="border border-ui-border-base bg-ui-bg-base rounded-2xl p-5 shadow-sm min-h-32 whitespace-pre-wrap leading-relaxed text-ui-fg-base">
                {selectedTicket?.message}
              </div>
            </div>

            {/* Change Status Dropdown */}
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="ticket-status" className="text-xs font-semibold uppercase tracking-wider text-ui-fg-subtle">Update Ticket Status</Label>
              <Select
                value={ticketStatus}
                onValueChange={(val: string) => setTicketStatus(val)}
              >
                <Select.Trigger id="ticket-status">
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="open">Open</Select.Item>
                  <Select.Item value="pending">Pending</Select.Item>
                  <Select.Item value="resolved">Resolved</Select.Item>
                </Select.Content>
              </Select>
            </div>
          </Drawer.Body>

          <Drawer.Footer className="border-t p-4">
            <div className="flex items-center justify-end gap-x-2">
              <Drawer.Close asChild>
                <Button size="small" variant="secondary" disabled={updateTicketMutation.isPending}>
                  Cancel
                </Button>
              </Drawer.Close>
              <Button
                size="small"
                onClick={handleSaveStatus}
                isLoading={updateTicketMutation.isPending}
              >
                Save Changes
              </Button>
            </div>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Support",
  icon: Envelope,
})

export default SupportPage
