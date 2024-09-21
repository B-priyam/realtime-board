"use client"

import { useOrganization } from "@clerk/nextjs"
import EmptyOrg from "./_components/emptyOrg"
import BoardList from "./_components/BoardList"

interface DashboardPageParams {
  searchParams :{
    search?: string,
    favourites?:string
  }
}

const Page = ({searchParams}:DashboardPageParams) => {
  const {organization}= useOrganization()

  return (
    <div className=" flex-1 h-[calc(100%-80px)] p-6 ">
      
      {!organization ? <EmptyOrg /> : <BoardList orgId={organization.id} query={searchParams} />}
    </div>
  )
}

export default Page
