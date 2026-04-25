import { Container } from "@modules/common/components/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse flex flex-col h-full bg-transparent">
      <div className="aspect-square w-full bg-gray-100 rounded-3xl mb-3" />
      <div className="flex flex-col gap-1 px-1">
        <div className="w-3/5 h-4 bg-gray-100 rounded"></div>
        <div className="w-4/5 h-5 bg-gray-100 rounded mt-1"></div>
        <div className="w-1/3 h-5 bg-gray-100 rounded mt-2"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
