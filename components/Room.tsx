"use client"

import React, { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/Canvas";

interface RoomProps {
    children : React.ReactNode,
    roomId : string,
    fallback : NonNullable<ReactNode> | null
}

export function Room({ children, roomId ,fallback} : RoomProps) {
    return (
      <LiveblocksProvider
      throttle={16}
      authEndpoint={"/api/liveblocks-auth"}>
        <RoomProvider 
            initialPresence={{
              cursor: null,
              selection : [],
              pencilDraft:null,
              penColor:null
            }} id={roomId}
          initialStorage={{
            layers: new LiveMap<string,LiveObject<Layer>>(),
            layerIds:new LiveList([]),

          }}
        >
          <ClientSideSuspense fallback={fallback}>
            {children}
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>
    );
  }