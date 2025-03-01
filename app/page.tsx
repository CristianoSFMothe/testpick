"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "./_components/ui/card";

import { Label } from "./_components/ui/label";
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
import { FileInput } from "lucide-react";

const framework = [
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
    .optional(),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Adicionado com sucesso", data);
    reset();
  };

  return (
    <main className="min-h-screen flex items-start justify-center pt-20 bg-gray-200">
      <Card className="w-[1024px] flex flex-col items-center justify-center p-6 rounded-2xl shadow-2xl border-2">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="framework"
                  className="items-center flex justify-center"
                >
                  Framework
                </Label>
                <Select onValueChange={(value) => setValue("framework", value)}>
                  <SelectTrigger id="framework" className="w-55">
                    <SelectValue placeholder="Selecione o framework" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {framework.map((item, index) => (
                      <SelectItem key={index} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.framework?.message && (
                  <p className="text-red-500 text-xs text-center">
                    {errors.framework.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col mt-4 mb-4 gap-4 items-center justify-center">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Informe seu nome"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs text-center">
                  {errors.name.message}
                </p>
              )}

              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Informe seu e-mail"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs text-center">
                  {errors.email.message}
                </p>
              )}

              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="number"
                placeholder="Informe seu telefone"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs text-center">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-55 text-2xl h-10 gap-3 flex items-center justify-center"
            >
              <FileInput size={24} />
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
