import SupportModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const SUPPORT_MODULE = "support"

export default Module(SUPPORT_MODULE, {
  service: SupportModuleService,
})
