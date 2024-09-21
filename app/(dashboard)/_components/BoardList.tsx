"use client"

import EmptyBoards from "./EmptyBoards";
import EmptyFav from "./EmptyFav";
import EmptySearch from "./emptySearch";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import BoardCard from "./board-card";
import NewBoardButton from "./NewBoardButton";


interface BoardListProps {
    orgId : string,
    query :{
        search?:string,
        favourites?:string
    }
}

const BoardList = ({orgId,query}:BoardListProps) => {
    const data = useQuery(api.boards.get,{orgId,
        ...query});

    if(data === undefined){
        return (
            <div>
      <h2 className="text-3xl">
        {query.favourites ? "Favourite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10 ">
        <NewBoardButton orgId={orgId} disabled />
        <BoardCard.Skeleton/>
        <BoardCard.Skeleton/>
        <BoardCard.Skeleton/>
        <BoardCard.Skeleton/>
        <BoardCard.Skeleton/>
        </div>

        </div>
        )
    }

    if(!data?.length && query.search){
        return (
            <div>
                <EmptySearch/>
            </div>
        )
    }

    if(!data?.length && query.favourites){
        return (
            <div><EmptyFav/></div>
        )
    }

    if(!data.length){
        return(
            <div><EmptyBoards/></div>
        )
    }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favourites ? "Favourite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10 ">
        <NewBoardButton
        orgId = {orgId}
        />
        {
            data.map((board) => {
                return (
                    <BoardCard key={board._id}
                    id={board._id}
                    title = {board.title}
                    imageUrl = {board.imageUrl}
                    authorId = {board.authorID}
                    authorName = {board.authorName}
                    createdAt = {board._creationTime}
                    currentOrgId = {board.orgId}
                    isFav = {board.isFav}
            />
                )
            })
        }
      </div>
    </div>
  )
}

export default BoardList
