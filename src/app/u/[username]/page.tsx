'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from 'ai/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';

const specialChar = '||';

// const parseStringMessages = (messageString: string): string[] => {
//   return messageString.split(specialChar);
// };

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

  const questions = [
    "What’s a hobby you’ve recently started?",
    "If you could have dinner with any historical figure, who would it be?",
    "What’s a simple thing that makes you happy?",
    "If you could visit any place in the world, where would you go and why?",
    "What’s your favorite book or movie, and why does it resonate with you?",
    "If you could instantly learn any skill, what would it be?",
    "What’s a memorable experience you’ve had this year?",
    "What’s your favorite way to spend a weekend?",
    "If you could live in any time period, which would you choose and why?",
    "What’s a random act of kindness you’ve recently experienced or performed?",
    "What’s a piece of advice you’ve received that has stuck with you?",
    "If you could have a conversation with any fictional character, who would it be and why?",
    "What’s something new you’ve tried lately and enjoyed?",
    "What’s a dream you have for the future?",
    "If you could have any animal as a pet, real or imaginary, what would it be?",
    "What’s your favorite season and why?",
    "If you could master any musical instrument, which would you choose?",
    "What’s a food you’ve always wanted to try but haven’t yet?",
    "If you could switch lives with anyone for a day, who would it be and why?",
    "What’s the best gift you’ve ever received?",
    "What’s the best gift you’ve ever given?",
    "If you could time travel, would you go to the past or the future?",
    "What’s your favorite way to relax after a long day?",
    "What’s a place you’ve always wanted to visit but haven’t had the chance to yet?",
    "If you could have any superpower, what would it be and why?",
    "What’s a favorite childhood memory of yours?",
    "What’s a book or movie that had a big impact on you?",
    "If you could create a new holiday, what would it celebrate?",
    "What’s something you’ve always been curious about?",
    "What’s your favorite type of music or artist?",
    "If you could be any mythical creature, what would you be and why?",
    "What’s a tradition you have with your friends or family?",
    "What’s the most interesting thing you’ve learned recently?",
    "If you could spend a day with any celebrity, who would it be and why?",
    "What’s your favorite outdoor activity?",
    "If you could live in any fictional world, where would it be?",
    "What’s a goal you’re currently working towards?",
    "What’s the best piece of advice you would give to someone else?",
    "What’s your favorite way to express creativity?",
    "If you could have any job for a day, what would it be and why?",
    "What’s your favorite holiday and why?",
    "If you could invent something, what would it be?",
    "What’s a hobby you wish you had more time for?",
    "What’s your favorite type of weather?",
    "If you could meet any living person, who would it be and why?",
    "What’s a skill you admire in others?",
    "If you could redo any day in your life, what would it be and why?",
    "What’s your favorite board or card game?",
    "If you could have a themed party, what would the theme be?",
    "What’s a book you think everyone should read?",
    "What’s the most adventurous thing you’ve ever done?",
    "If you could learn any language, which one would you choose?",
    "What’s your favorite way to celebrate a special occasion?",
    "If you could design your dream home, what would it look like?",
    "What’s a cause you’re passionate about?",
    "What’s your favorite way to stay active?",
    "If you could play any role in a movie, who would you be?",
    "What’s the best compliment you’ve ever received?",
    "If you could have any artist create a piece of art just for you, who would it be?",
    "What’s a talent you have that not many people know about?",
    "If you could create your own amusement park ride, what would it be like?",
    "What’s your favorite way to spend a rainy day?",
    "If you could be an expert in any field, what would it be?",
    "What’s a challenge you’ve overcome that you’re proud of?",
    "If you could write a book, what genre would it be?",
    "What’s your favorite type of dessert?",
    "If you could have a magical pet, what would it be?",
    "What’s a place that holds a special meaning to you?",
    "If you could change one thing about the world, what would it be?",
    "What’s your favorite way to start your day?",
    "If you could host a dinner party with any three people, who would you invite?",
    "What’s a song that always makes you feel happy?",
    "If you could build your perfect day, what would it look like?",
    "What’s your favorite way to unwind in the evening?",
    "If you could create a new app, what would it do?",
    "What’s a tradition you would like to start?",
    "If you could visit any fictional place, where would it be?",
    "What’s the best meal you’ve ever had?",
    "If you could have any three wishes granted, what would they be?",
    "What’s your favorite way to enjoy nature?",
    "If you could have any job in the world, what would it be?",
    "What’s a subject you could talk about for hours?",
    "If you could live in any city, which one would you choose?",
    "What’s a movie or TV show you can watch over and over again?",
    "If you could have a personal chef, what type of cuisine would they specialize in?",
    "What’s a dream vacation destination for you?",
    "If you could meet any character from a book, who would it be?",
    "What’s the most interesting documentary you’ve ever watched?",
    "If you could have a home filled with any one thing, what would it be?",
    "What’s your favorite way to stay healthy?",
    "If you could be a fly on the wall for any event in history, what would it be?",
    "What’s a goal you’ve set for yourself this year?",
    "If you could have a conversation with your future self, what would you ask?",
    "What’s your favorite way to spend quality time with loved ones?",
    "If you could learn about any topic from an expert, what would it be?",
    "What’s a favorite quote or saying of yours?",
    "If you could design a new clothing line, what style would it be?"
  ];


  
  

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;



  const [suggestMessages, setSuggestMessages] = useState<any>([]);

  useEffect(()=>{
    parseStringMessages();
  },[])

  const parseStringMessages = ()=>{
    const arr = [questions[Math.floor(Math.random() * questions.length)],questions[Math.floor(Math.random() * questions.length)],questions[Math.floor(Math.random() * questions.length)]];
    setSuggestMessages(arr);
  }



  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button
            onClick={parseStringMessages}
            className="my-4"
            disabled={isSuggestLoading}
          >
            Suggest Messages
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              suggestMessages.map((message:any, index:any) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
