import type { LucideIcon } from "lucide-react";
import { Landmark, Scale, Gavel } from "lucide-react";

/**
 * Configuração central da advogada/escritório.
 * Altere aqui as informações institucionais — nunca espalhe dados
 * de contato, redes sociais ou áreas de atuação pelo restante do código.
 *
 * Dados extraídos do cartão de visita oficial. Campos marcados com
 * "[INSERIR INFORMAÇÃO]" não constam no cartão e devem ser preenchidos
 * antes da publicação, quando disponíveis.
 */

// Apenas dígitos, com código do país (Brasil = 55) + DDD + número.
export const WHATSAPP_NUMBER = "5516991717064";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Acessei o site e gostaria de obter uma orientação jurídica.";

export interface PracticeArea {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "instagram" | "linkedin" | "facebook";
}

export interface SiteConfig {
  firmName: string;
  shortName: string;
  tagline: string;
  oabInfo: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: {
    street: string;
    complement: string;
    city: string;
    state: string;
    zip: string;
  };
  businessHours: string;
  social: SocialLink[];
  practiceAreas: PracticeArea[];
  differentiators: { title: string; description: string }[];
}

export const siteConfig: SiteConfig = {
  firmName: "Letícia Ribeiro Lino Costa",
  shortName: "Letícia Lino Costa",
  tagline: "Previdenciário · Cível · Criminal",
  oabInfo: "OAB/SP 497.404",
  phone: "+55 16 99171-7064",
  phoneDisplay: "(16) 99171-7064",
  email: "leticialinocosta@hotmail.com",
  address: {
    street: "Rua Jacinto Felizardo Barbosa, 750",
    complement: "Centro",
    city: "Miguelópolis",
    state: "SP",
    zip: "[INSERIR CEP]",
  },
  businessHours: "Segunda a sexta, das 9h às 17h",
  social: [],
  practiceAreas: [
    {
      slug: "direito-previdenciario",
      name: "Direito Previdenciário",
      shortDescription:
        "Orientação em benefícios e questões junto ao INSS.",
      description:
        "Análise de elegibilidade e acompanhamento de processos administrativos e judiciais relacionados a benefícios previdenciários.",
      icon: Landmark,
    },
    {
      slug: "direito-civil",
      name: "Direito Civil",
      shortDescription:
        "Assessoria jurídica para situações envolvendo relações civis e patrimoniais.",
      description:
        "Orientação em contratos, responsabilidade civil, questões patrimoniais e demais matérias do direito civil.",
      icon: Scale,
    },
    {
      slug: "direito-criminal",
      name: "Direito Criminal",
      shortDescription:
        "Acompanhamento e defesa em processos e inquéritos criminais.",
      description:
        "Atuação em inquéritos policiais, ações penais e demais procedimentos criminais, com atenção técnica a cada etapa.",
      icon: Gavel,
    },
  ],
  differentiators: [
    {
      title: "Atendimento personalizado",
      description:
        "Cada cliente é recebido com atenção individual, sem respostas padronizadas.",
    },
    {
      title: "Análise individualizada de cada caso",
      description:
        "Estudamos o contexto específico de cada situação antes de indicar um caminho.",
    },
    {
      title: "Comunicação clara",
      description:
        "Explicamos os próximos passos em linguagem acessível, sem juridiquês desnecessário.",
    },
    {
      title: "Atuação ética e responsável",
      description:
        "Conduzimos cada caso em conformidade com as normas da advocacia.",
    },
    {
      title: "Compromisso com o cliente",
      description:
        "Acompanho cada etapa do processo com transparência e dedicação.",
    },
  ],
};
