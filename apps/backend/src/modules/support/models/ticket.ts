import { model } from "@medusajs/framework/utils"

const Ticket = model.define("ticket", {
  id: model.id().primaryKey(),
  name: model.text(),
  email: model.text(),
  subject: model.text(),
  message: model.text(),
  status: model.text().default("open"),
})

export default Ticket
