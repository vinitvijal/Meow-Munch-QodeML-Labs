export const formatProductDescription = (description?: string | null) => {
  if (!description) {
    return []
  }

  const cleaned = description
    .trim()
    .replace(/^["'“”]+/, "")
    .replace(/["'“”]+$/, "")
    .replace(/\r\n/g, "\n")

  return cleaned
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n+/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean)
}
