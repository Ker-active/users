"use client";

import { Button } from "@/components/ui/button";
import { SendHorizontal, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useState } from "react";
import { cn } from "@/lib";
import { useWindowDimensions } from "@/hooks";
import { ChatList } from "@/components/shared";

export default function Page() {
  const [showingEmoji, setShowingEmoji] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <div className='bg-white  px-4 flex flex-col py-4 justify-between h-[calc(100svh-280px)] sm:h-[calc(100svh-240px)]'>
      <ChatList />
      <div className='h-[56px] relative focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-2 rounded-[12px] bg-[#F4F2F2] items-center flex flex-row gap-4 justify-between'>
        <div
          className={cn(
            "w-full absolute bottom-full left-0",
            showingEmoji ? "block" : "hidden"
          )}
        >
          <EmojiPicker
            onEmojiClick={(result) => {
              setShowingEmoji(false);
            }}
            theme={Theme.DARK}
            previewConfig={{
              showPreview: false,
            }}
            lazyLoadEmojis
            width={width < 600 ? width - 64 : width - 348}
          />
        </div>
        <Button
          onClick={() => setShowingEmoji((prev) => !prev)}
          variant='ghost'
          size='icon'
        >
          <Smile size={24} color='#707991' />
        </Button>
        <Input
          className='border-none py-0 bg-transparent placeholder:text-[#25273366] focus-visible:ring-offset-0  px-0 outline-0  focus-visible:ring-0  text-[#737373]'
          placeholder='Type a message...'
        />
        <Button variant='ghost' size='icon'>
          <SendHorizontal size={24} color='#008080' />
        </Button>
      </div>
    </div>
  );
}
