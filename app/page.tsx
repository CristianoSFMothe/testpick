"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "@/app/_utils/schema";

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
import { Button } from "./_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./_components/ui/form";

const frameworks = [
  "Cypress",
  "Selenium",
  "Robot Framework",
  "Playwright",
  "Jest",
  "Mocha",
  "TestCafe",
  "Puppeteer",
  "Appium",
  "Katalon Studio",
  "JUnit",
  "Capybara",
  "Sikuli",
  "TestNG",
  "Karate Framework",
];

export default function Home() {
  const [message, setMessage] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
    setError,
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
        setMessage(responseData.message || "Formulário enviado com sucesso!");
        reset();
      } else {
        setMessage(responseData.message || "Erro ao enviar formulário");

        if (responseData.errors) {
          Object.entries(responseData.errors).forEach(
            ([field, errorMessages]) => {
              setError(field as keyof FormData, {
                message: (errorMessages as string[])[0],
              });
            },
          );
        }
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setMessage("Erro ao enviar formulário");
    }
  };

  return (
    <main className="min-h-screen flex items-start justify-center pt-20 bg-gray-200">
      <Card className="w-[700px] flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl border-2">
        <CardHeader className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold">Test Pick</h1>
          <CardDescription>
            <p className="text-lg">
              Escolha qual o framework para automação você mais gosta de
              utilizar
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid w-full items-center gap-6">
                <FormField
                  control={control}
                  name="framework"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Framework</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="w-full h-12">
                          <SelectValue placeholder="Selecione um framework" />
                        </SelectTrigger>
                        <SelectContent>
                          {frameworks.map((framework, index) => (
                            <SelectItem key={index} value={framework}>
                              {framework}
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
                    Explique por que você prefere este framework
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
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...register("name")}
                      placeholder="Digite seu nome"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...register("email")}
                      placeholder="Digite seu e-mail"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      {...register("phone")}
                      placeholder="Digite seu telefone"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage>{errors.phone?.message}</FormMessage>
                </FormItem>

                <Button type="submit" className="mt-4 w-full h-12">
                  Enviar
                </Button>
              </div>
            </form>
          </Form>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
