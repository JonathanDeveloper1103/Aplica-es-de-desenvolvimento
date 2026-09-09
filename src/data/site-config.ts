import type { LucideIcon } from "lucide-react";
import {
  Scale,
  Users,
  Briefcase,
  Home,
  Landmark,
  ShieldCheck,
} from "lucide-react";

/**
 * Configuração central do escritório.
 * Altere aqui as informações institucionais — nunca espalhe dados
 * de contato, redes sociais ou áreas de atuação pelo restante do código.
 *
 * Campos marcados com "[INSERIR INFORMAÇÃO]" são placeholders e devem
 * ser substituídos por dados reais e verificados do escritório antes
 * da publicação em produção.
 */

// Apenas dígitos, com código do país (Brasil = 55) + DDD + número.
export const WHATSAPP_NUMBER = "5500000000000"; // [INSERIR INFORMAÇÃO]

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Acessei o site do escritório e gostaria de obter uma orientação.";

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
  founded?: string;
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
  firmName: "[INSERIR NOME DO ESCRITÓRIO]",
  shortName: "[INSERIR NOME]",
  tagline: "Advocacia consultiva e contenciosa",
  oabInfo: "OAB/UF [INSERIR NÚMERO]", // [INSERIR INFORMAÇÃO]
  phone: "+55 (00) 0000-0000", // [INSERIR INFORMAÇÃO]
  phoneDisplay: "(00) 0000-0000", // [INSERIR INFORMAÇÃO]
  email: "contato@[inserir-dominio].com.br", // [INSERIR INFORMAÇÃO]
  address: {
    street: "[INSERIR ENDEREÇO]",
    complement: "[INSERIR COMPLEMENTO/SALA]",
    city: "[INSERIR CIDADE]",
    state: "[UF]",
    zip: "[INSERIR CEP]",
  },
  businessHours: "Segunda a sexta, das 9h às 18h", // [INSERIR INFORMAÇÃO]
  social: [
    { label: "LinkedIn", href: "#", icon: "linkedin" }, // [INSERIR INFORMAÇÃO]
    { label: "Instagram", href: "#", icon: "instagram" }, // [INSERIR INFORMAÇÃO]
  ],
  practiceAreas: [
    {
      slug: "direito-de-familia",
      name: "Direito de Família",
      shortDescription:
        "Orientação e acompanhamento jurídico em questões relacionadas às relações familiares.",
      description:
        "Assessoria em processos de divórcio, guarda, pensão alimentícia, inventário e demais questões que envolvem o direito das famílias, sempre com atenção e discrição.",
      icon: Users,
    },
    {
      slug: "direito-trabalhista",
      name: "Direito Trabalhista",
      shortDescription:
        "Atuação e orientação em questões relacionadas às relações de trabalho.",
      description:
        "Acompanhamento de demandas trabalhistas para empregados e empregadores, com análise individualizada de cada situação contratual.",
      icon: Briefcase,
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
      slug: "direito-imobiliario",
      name: "Direito Imobiliário",
      shortDescription:
        "Suporte jurídico em transações e questões relacionadas a imóveis.",
      description:
        "Análise de contratos de compra, venda e locação, regularização de imóveis e orientação em questões condominiais.",
      icon: Home,
    },
    {
      slug: "direito-empresarial",
      name: "Direito Empresarial",
      shortDescription:
        "Consultoria jurídica para empresas em suas atividades e relações comerciais.",
      description:
        "Apoio em constituição societária, contratos empresariais e orientação preventiva para a atividade empresarial.",
      icon: Landmark,
    },
    {
      slug: "direito-previdenciario",
      name: "Direito Previdenciário",
      shortDescription:
        "Orientação em benefícios e questões junto ao INSS.",
      description:
        "Análise de elegibilidade e acompanhamento de processos administrativos e judiciais relacionados a benefícios previdenciários.",
      icon: ShieldCheck,
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
        "Acompanhamos cada etapa do processo com transparência e dedicação.",
    },
  ],
};
