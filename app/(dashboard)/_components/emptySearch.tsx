import Image from "next/image"

Image

const EmptySearch = () => {
  return (
    <div className="h-[100%] flex flex-col items-center justify-normal">
      <Image
      src={"/empty-search.png"}
      height={140}
      width={140}
      alt="Empty"
      />
      <h2 className="text-2xl mt-6 font-semibold  ">
        No Results Found
      </h2>
      <p className="text-muted-foreground text-sm mt-2 ">
        Try searching for something else
      </p>
    </div>
  )
}

export default EmptySearch
