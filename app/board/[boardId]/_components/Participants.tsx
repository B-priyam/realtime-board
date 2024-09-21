"use client"

import { useOthers, useSelf } from "@liveblocks/react/suspense"
import UserAvatar from "./UserAvatar"
import { connectionIdToColor } from "@/lib/utils"

const MAX_SHOWN_USERS = 2

const Participants = () => {
  const users = useOthers()
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS

  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md px-2 m-3 flex items-center shadow-md'>
        <div className="flex gap-x-2 ">
          {users.slice(0,MAX_SHOWN_USERS).map(({connectionId,info})=>{
            return (
              <UserAvatar
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || 'T'}
              borderColor={connectionIdToColor(connectionId)}
              />
            )
          })}

          {currentUser && (
            <UserAvatar
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name}(You)`}
            fallback={currentUser.info?.name?.[0]}
            borderColor={connectionIdToColor(currentUser.connectionId)}
            />
          )}

          {hasMoreUsers && (
            <UserAvatar 
            name={`${users.length - MAX_SHOWN_USERS}more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
            />
          )}
        </div>
    </div>
  )
}

export default Participants

export const ParticipantSkeleton = () => {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md m-3 flex items-center shadow-md w-[100px]'>
    </div>
  )
}