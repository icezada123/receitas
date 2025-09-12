'use client';

import { processUserMessage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { ChefHat, LoaderCircle, Send, User } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { RecipeCard } from './recipe-card';

const ChatSchema = z.object({
  message: z.string().min(1, 'A mensagem não pode estar vazia.'),
});

type ChatSchemaType = z.infer<typeof ChatSchema>;

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<ChatSchemaType>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    setMessages([
      {
        id: 'initial-1',
        role: 'assistant',
        content: 'Olá! Sou seu chef pessoal de IA. O que você gostaria de cozinhar hoje?',
      },
    ]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const onSubmit = (data: ChatSchemaType) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: data.message,
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    form.reset();

    startTransition(async () => {
      const { recipe, error } = await processUserMessage(newMessages);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: error,
        });
        const errorMessage: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: error,
            isError: true,
        }
        setMessages((prev) => [...prev, errorMessage]);
        return;
      }
      
      if (recipe) {
          const assistantMessage: Message = {
              id: crypto.randomUUID(),
              role: 'assistant',
              content: `Aqui está sua receita para ${recipe.recipeName}.`,
              recipe: recipe,
            };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    });
  };

  return (
    <Card className="w-full h-full flex flex-col shadow-lg rounded-xl flex-1">
      <CardContent className="flex flex-col flex-1 p-0">
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn('flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300', {
                  'justify-end flex-row-reverse': message.role === 'user',
                })}
              >
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback className={cn(message.isError ? 'bg-destructive text-destructive-foreground' : 'bg-secondary')}>
                    {message.role === 'assistant' ? <ChefHat className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    'p-3 rounded-lg max-w-sm md:max-w-md lg:max-w-lg',
                    {
                      'bg-primary/20': message.role === 'user',
                      'bg-muted': message.role === 'assistant',
                      'bg-destructive/20 text-destructive-foreground': message.isError,
                    }
                  )}
                >
                  {message.recipe ? (
                    <RecipeCard recipe={message.recipe} />
                  ) : (
                    <p className="text-sm md:text-base whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
             {isPending && (
                <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback className="bg-secondary">
                            <ChefHat className="w-5 h-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="p-3 rounded-lg bg-muted flex items-center justify-center">
                        <LoaderCircle className="w-5 h-5 animate-spin text-primary" />
                    </div>
                </div>
             )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background/80 backdrop-blur-sm rounded-b-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Ex: Quero um strogonoff para 4 pessoas..."
                        className="text-base"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon" disabled={isPending}>
                {isPending ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
