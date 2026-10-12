"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { leadSchema, type LeadFormValues } from "@/lib/validation";
import { maskPhone, unmaskPhone } from "@/lib/phone-mask";
import { siteConfig } from "@/data/site-config";
import Button from "@/components/ui/Button";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [phoneDisplay, setPhoneDisplay] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      practiceArea: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setSubmitState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Não foi possível enviar seus dados.");
      }

      setSubmitState("success");
      reset();
      setPhoneDisplay("");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar seus dados. Tente novamente.",
      );
    }
  };

  if (submitState === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-sm border border-border-soft bg-white p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold" aria-hidden="true" />
        <h3 className="font-serif text-xl text-green">
          Mensagem recebida com sucesso
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          Obrigado pelo contato. As informações serão analisadas com atenção
          e o retorno será feito em breve pelos dados informados.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setSubmitState("idle")}
        >
          Enviar nova mensagem
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-sm border border-border-soft bg-white p-6 sm:p-8"
    >
      {/* Honeypot — campo invisível para humanos, usado para filtrar bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft"
          >
            Nome completo
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full rounded-sm border border-border-soft bg-cream/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-green"
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-700">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft"
          >
            WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="w-full rounded-sm border border-border-soft bg-cream/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-green"
            value={phoneDisplay}
            onChange={(event) => {
              setPhoneDisplay(maskPhone(event.target.value));
              setValue("phone", unmaskPhone(event.target.value), {
                shouldValidate: true,
              });
            }}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1.5 text-xs text-red-700">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-sm border border-border-soft bg-cream/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-green"
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-700">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="city"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft"
          >
            Cidade
          </label>
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
            className="w-full rounded-sm border border-border-soft bg-cream/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-green"
            {...register("city")}
          />
          {errors.city && (
            <p id="city-error" role="alert" className="mt-1.5 text-xs text-red-700">
              {errors.city.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="practiceArea"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft"
          >
            Área de interesse
          </label>
          <select
            id="practiceArea"
            defaultValue=""
            aria-invalid={!!errors.practiceArea}
            aria-describedby={
              errors.practiceArea ? "practiceArea-error" : undefined
            }
            className="w-full rounded-sm border border-border-soft bg-cream/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-green"
            {...register("practiceArea")}
          >
            <option value="" disabled>
              Selecione uma área
            </option>
            {siteConfig.practiceAreas.map((area) => (
              <option key={area.slug} value={area.name}>
                {area.name}
              </option>
            ))}
            <option value="Outro assunto">Outro assunto</option>
          </select>
          {errors.practiceArea && (
            <p
              id="practiceArea-error"
              role="alert"
              className="mt-1.5 text-xs text-red-700"
            >
              {errors.practiceArea.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-soft"
          >
            Breve descrição da situação
          </label>
          <textarea
            id="message"
            rows={4}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="w-full resize-none rounded-sm border border-border-soft bg-cream/40 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-green"
            {...register("message")}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-700">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-xs leading-relaxed text-ink-soft">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-border-soft text-green focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              {...register("consent")}
            />
            Autorizo o escritório a entrar em contato comigo através dos
            dados fornecidos, conforme a{" "}
            <a href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-green">
              Política de Privacidade
            </a>
            .
          </label>
          {errors.consent && (
            <p id="consent-error" role="alert" className="mt-1.5 text-xs text-red-700">
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

      {submitState === "error" && (
        <div className="mt-5 flex items-start gap-2 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={submitState === "loading"}
        className="mt-6 w-full"
      >
        {submitState === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          "Enviar mensagem"
        )}
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-ink-soft/80">
        Os dados fornecidos serão utilizados exclusivamente para contato e
        atendimento inicial, conforme nossa{" "}
        <a
          href="/politica-de-privacidade"
          className="underline underline-offset-2 hover:text-green"
        >
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
}
