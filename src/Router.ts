import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  videos: router({
    list: protectedProcedure.query(({ ctx }) => db.getUserVideos(ctx.user.id)),
    
    get: protectedProcedure
      .input(z.object({ videoId: z.number() }))
      .query(async ({ input }) => {
        const video = await db.getVideo(input.videoId);
        if (!video) throw new TRPCError({ code: "NOT_FOUND" });
        return video;
      }),
    
    create: protectedProcedure
      .input(z.object({ 
        title: z.string().optional(), 
        prompt: z.string(), 
        type: z.enum(["ai_generated", "uploaded"]) 
      }))
      .mutation(async ({ ctx, input }) => {
        const credits = await db.getUserCredits(ctx.user.id);
        if (!credits || credits.videosRemaining <= 0) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Insufficient video credits" });
        }
        
        const deducted = await db.deductVideoCredit(ctx.user.id);
        if (!deducted) throw new TRPCError({ code: "FORBIDDEN", message: "Failed to deduct credit" });
        
        const video = await db.createVideo({ 
          userId: ctx.user.id, 
          title: input.title, 
          prompt: input.prompt, 
          type: input.type 
        });
        
        return video;
      }),
  }),

  credits: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      let credits = await db.getUserCredits(ctx.user.id);
      if (!credits) {
        credits = await db.createUserCredits(ctx.user.id);
      }
      return credits;
    }),
  }),

  payments: router({
    create: protectedProcedure
      .input(z.object({ amount: z.number(), creditsAdded: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return { success: true, message: "Payment initiated" };
      }),
  }),
});

export type AppRouter = typeof appRouter;
