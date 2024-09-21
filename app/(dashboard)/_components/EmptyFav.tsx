import Image from "next/image"

Image

const EmptyFav = () => {
  return (
    <div className="h-[100%] flex flex-col items-center justify-normal">
      <Image
      src={"/empty-favourite.png"}
      height={140}
      width={140}
      alt="Empty"
      />
      <h2 className="text-2xl mt-6 font-semibold  ">
        No Favourite Boards
      </h2>
      <p className="text-muted-foreground text-sm mt-2 ">
        Try Adding boards to favourites
      </p>
    </div>
  )
}

export default EmptyFav
