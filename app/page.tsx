"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "./_components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./_components/ui/select";
import { Input } from "./_components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./_components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./_components/ui/form";
import { cn } from "./_lib/utils";

const frameworks = [
  { name: "Cypress" },
  { name: "Selenium" },
  { name: "Robot Framework" },
  { name: "Playwright" },
  { name: "Jest" },
  { name: "Mocha" },
  { name: "TestCafe" },
  { name: "Puppeteer" },
  { name: "Appium" },
  { name: "Katalon Studio" },
  { name: "JUnit" },
  { name: "Capybara" },
  { name: "Sikuli" },
  { name: "TestNG" },
  { name: "Karate Framework" },
];

const schema = z.object({
  framework: z.string().min(1, "Selecione um framework"),
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(15, "Telefone não pode ter mais de 15 dígitos")
    .or(z.literal(""))
    .optional(),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .max(1500, "A descrição não pode ter mais de 1500 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const [message, setMessage] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      framework: "",
      name: "",
      email: "",
      phone: "",
      description: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage("Formulário enviado com sucesso!");
        setTimeout(() => {
          reset();
          setMessage("");
        }, 3000);
      } else {
        setMessage(responseData.message || "Erro ao enviar formulário");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setMessage("Erro ao enviar formulário");
    }
  };

  return (
    <main className="min-h-screen flex items-start justify-center pt-20 px-4 bg-gray-200">
      <Card
        className={cn(
          "w-full max-w-lg flex flex-col items-center",
          "justify-center p-6 rounded-2xl shadow-2xl border-2",
        )}
      >
        <CardHeader className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Test Pick</h1>
          <CardDescription>
            <p className="text-md text-gray-600 text-center">
              Escolha qual framework de automação você mais gosta de usar
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid w-full gap-4">
                {/* Framework */}
                <FormField
                  control={control}
                  name="framework"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Framework</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="w-full h-10 border border-gray-300 rounded-md px-3 text-md">
                          <SelectValue placeholder="Selecione um framework" />
                        </SelectTrigger>
                        <SelectContent>
                          {frameworks.map((framework, index) => (
                            <SelectItem key={index} value={framework.name}>
                              {framework.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors.framework?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel className="text-md">
                    Descreva os motivos pelos quais você escolheu este framework
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...register("description")}
                      placeholder="Digite uma descrição"
                      className="w-full p-3 border border-gray-300 rounded-md text-md h-28 resize-none"
                    />
                  </FormControl>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel className="text-md">Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...register("name")}
                      placeholder="Digite seu nome"
                      className="w-full h-10 border border-gray-300 rounded-md px-3 text-md"
                    />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...register("email")}
                      placeholder="Digite seu e-mail"
                      className="w-full h-10 border border-gray-300 rounded-md px-3 text-md"
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel className="text-md">Telefone</FormLabel>
                  <FormControl>
                    <Input
                      {...register("phone")}
                      placeholder="Digite seu telefone"
                      className="w-full h-10 border border-gray-300 rounded-md px-3 text-md"
                    />
                  </FormControl>
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormItem>

                <Button type="submit" className="mt-4 w-full h-12 text-md">
                  Enviar
                </Button>
              </div>
            </form>
          </Form>

          {message && (
            <p className="mt-4 text-center text-md text-gray-600">{message}</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
