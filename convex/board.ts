import {v} from "convex/values"
import {mutation, query} from "./_generated/server"

const images = [
    "/placeholder/1.svg",
    "/placeholder/2.svg",
    "/placeholder/3.svg",
]

export const create = mutation({
    args:{
        orgId:v.string(),
        title:v.string()
    },
    handler:async(ctx,args)=>{
        const identity  = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized");
        }
        const randomImage = images[Math.floor(Math.random()*images.length)]
        const board = await ctx.db.insert("boards",{
            orgId:args.orgId,
            title:args.title,
            imageUrl:randomImage,
            authorID:identity.subject,
            authorName:identity.name!,

        })
        return board
    }
})

export const remove = mutation({
    args:{
        id:v.id("boards")
    },
    handler:async(ctx,args)=>{
        const identity  = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized");
            }
        const userId  = identity.subject
        const existingFav = await ctx.db.query("userFavourites")
        .withIndex("by_user_board",(q)=>
        q.eq("userId",userId)
         .eq("boardId",args.id)
        )
        .unique()
        if(existingFav){
            await ctx.db.delete(existingFav._id)
        }
        await ctx.db.delete(args.id)
    }
})

export const update = mutation({
    args:{
        id:v.id("boards"),
        title:v.string()
    },
    handler:async(ctx,args)=>{
        const title = args.title.trim()
        const identity = await ctx.auth.getUserIdentity()
        if(!title){
            throw new Error("Title is required");
        }
        if(title.length > 60){
            throw new Error("Title cannot be longer than 60 characters");
        }
        if(!identity){
            throw new Error("Unauthorized")
        }
        const board = await ctx.db.patch(args.id,{
            title:args.title
        })
        return board
    }
})

export const favourites = mutation({
    args:{id:v.id("boards"),
        orgId:v.string()
    },
    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new Error("unauthrorized")
        }
        const board = await ctx.db.get(args.id)
        if(!board){
            throw new Error("board not found")
        }

        const userId = identity.subject

        const existingFav = await ctx.db.query("userFavourites")
        .withIndex("by_user_board",(q)=>
            q.eq("userId",userId)
            .eq("boardId",board._id)
        ).unique();

        if(existingFav){
            throw new Error("board already favourites")
        }
        await ctx.db.insert("userFavourites",{
            userId,
            boardId:board._id,
            orgId:args.orgId
        })
        return board
    }
})

export const unFavourite = mutation({
    args:{id:v.id("boards"),
    },
    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity()
        if(!identity){
            throw new Error("unauthrorized")
        }
        const board = await ctx.db.get(args.id)
        if(!board){
            throw new Error("board not found")
        }

        const userId = identity.subject

        const existingFav = await ctx.db.query("userFavourites")
        .withIndex("by_user_board",(q)=>
            q.eq("userId",userId)
            .eq("boardId",board._id)
        ).unique();

        if(!existingFav){
            throw new Error("favourited board not found")
        }
        await ctx.db.delete(existingFav._id)
        return board
    }
})

export const get = query({
    args :{
        id : v.id("boards"),
    },
    handler : async (ctx,args) =>{
        const board = ctx.db.get(args.id)
        return board
    }
})

