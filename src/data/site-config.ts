import type { LucideIcon } from "lucide-react";
import {
  Ear,
  Compass,
  HeartHandshake,
  Sprout,
  CloudRain,
  CloudSun,
  Video,
  Clock,
  Globe,
  ShieldCheck,
  House,
  CalendarCheck,
} from "lucide-react";

/**
 * Configuração central do profissional.
 *
 * Altere aqui as informações institucionais do psicólogo. Dados de
 * contato do WhatsApp ficam em `src/config/contact.ts`.
 *
 * Mantenha apenas informações fornecidas pelo profissional. Não invente
 * endereço, telefone fixo, preços, horários, títulos ou especialidades.
 */

export interface ApproachBlock {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface CareTopic {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface OnlineBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SiteConfig {
  fullName: string;
  shortName: string;
  role: string;
  crp: string;
  eyebrow: string;
  heroTitle: string;
  heroSupport: string;
  heroHelper: string;
  photos: {
    hero: string;
    portrait: string;
  };
  bioParagraphs: string[];
  approach: {
    title: string;
    intro: string;
    blocks: ApproachBlock[];
  };
  careTopics: CareTopic[];
  onlineCare: {
    title: string;
    intro: string;
    note: string;
    benefits: OnlineBenefit[];
  };
}

export const siteConfig: SiteConfig = {
  fullName: "Vinícius Tomaz Lacerda Silva",
  shortName: "Vinícius Tomaz",
  role: "Psicólogo",
  crp: "CRP 06/180116",

  eyebrow: "Psicologia • Acolhimento • Sentido",
  heroTitle:
    "Um espaço para compreender sua história e encontrar novos sentidos.",
  heroSupport:
    "Um acompanhamento psicológico humanizado, que respeita sua singularidade e considera sua história, suas experiências e os desafios que você enfrenta.",
  heroHelper:
    "Um espaço de escuta, reflexão e cuidado com a saúde mental.",

  photos: {
    // Foto de capa (primeira dobra): o profissional com a camisa
    // verde-oliva. Substitua o arquivo mantendo o mesmo nome.
    hero: "/images/vinicius-hero.jpg",
    // Retrato usado na seção de trajetória (com o livro, trajetória profissional).
    portrait: "/images/vinicius-retrato.jpg",
  },

  bioParagraphs: [
    "Sou graduado em Psicologia pela Universidade de Franca (UNIFRAN), desde 2022, e possuo pós-graduação em Análise Existencial e Logoterapia Frankliana pelo UNIÍTALO (Centro Universitário Católico Ítalo Brasileiro), abordagem que compreende a busca por sentido como uma dimensão fundamental da existência humana.",
    "Atuo na área da saúde desde 2022, com experiência no cuidado em saúde mental e no acompanhamento psicológico de pessoas que vivenciam sofrimento emocional e dificuldades relacionadas à saúde mental.",
    "Tenho experiência no acompanhamento de demandas relacionadas à ansiedade, depressão, vazio existencial e uso de álcool e outras drogas, buscando compreender cada indivíduo em sua singularidade, considerando sua história de vida, suas experiências e os fatores que influenciam seu sofrimento.",
    "Minha atuação é fundamentada em uma perspectiva humanizada, com contribuições da Análise Existencial e da Logoterapia, que valorizam a liberdade e a responsabilidade pessoal, a capacidade de encontrar sentido mesmo diante de situações difíceis e a identificação de valores que orientam a vida.",
    "Acredito que o processo psicoterapêutico pode favorecer o autoconhecimento, a ampliação das possibilidades de enfrentamento do sofrimento e a construção de uma vida mais consciente e significativa. Nesse percurso, busco acolher cada pessoa de maneira ética e respeitosa, auxiliando-a a reconhecer suas potencialidades, significar experiências e encontrar novos caminhos diante dos desafios da existência.",
  ],

  approach: {
    title: "Encontrar sentido também faz parte do caminho.",
    intro:
      "A Análise Existencial e a Logoterapia Frankliana oferecem perspectivas para refletir sobre os valores, a liberdade, a responsabilidade e a construção de sentido na experiência humana.",
    blocks: [
      {
        title: "Escuta e singularidade",
        description:
          "Cada pessoa tem uma história própria. O acompanhamento considera suas experiências, seus contextos e a maneira singular como vivencia os desafios.",
        icon: Ear,
      },
      {
        title: "Autoconhecimento e reflexão",
        description:
          "Um espaço para compreender sentimentos, reconhecer padrões e ampliar a percepção sobre as próprias experiências e possibilidades.",
        icon: Compass,
      },
      {
        title: "Valores e sentido",
        description:
          "Reflexões sobre aquilo que orienta a vida, os valores pessoais e as possibilidades de encontrar sentido mesmo diante de situações difíceis.",
        icon: HeartHandshake,
      },
    ],
  },

  careTopics: [
    {
      slug: "ansiedade",
      title: "Ansiedade e sofrimento emocional",
      description:
        "Um espaço para explorar sentimentos e experiências relacionados ao sofrimento emocional, no seu tempo e com acolhimento.",
      icon: CloudRain,
    },
    {
      slug: "depressao",
      title: "Depressão e dificuldades relacionadas à saúde mental",
      description:
        "Escuta e reflexão diante de experiências difíceis, respeitando o momento e a singularidade de cada pessoa.",
      icon: CloudSun,
    },
    {
      slug: "sentido",
      title: "Vazio existencial e busca por sentido",
      description:
        "Reflexão em torno dos valores pessoais, do sentido e das questões existenciais que atravessam a vida.",
      icon: Compass,
    },
    {
      slug: "uso-de-substancias",
      title: "Questões relacionadas ao uso de álcool e outras drogas",
      description:
        "Acolhimento e compreensão das experiências relacionadas ao uso de substâncias, sem julgamentos.",
      icon: Sprout,
    },
  ],

  onlineCare: {
    title: "Atendimento psicológico online",
    intro:
      "O acompanhamento também é realizado de forma online, por videochamada, com o mesmo cuidado, a mesma escuta e o mesmo sigilo profissional do atendimento presencial. Você escolhe um ambiente reservado e confortável, e nos encontramos a partir de onde você estiver.",
    note: "Para a sessão online, basta ter conexão com a internet e um local tranquilo e privado.",
    benefits: [
      {
        title: "Comodidade e conforto",
        description:
          "Faça as sessões de um lugar em que você se sinta seguro e à vontade, sem tempo e custos de deslocamento.",
        icon: House,
      },
      {
        title: "Flexibilidade de horários",
        description:
          "Mais facilidade para encaixar o acompanhamento na sua rotina de trabalho e estudos.",
        icon: Clock,
      },
      {
        title: "Acesso de qualquer lugar",
        description:
          "Possibilidade de iniciar ou continuar o acompanhamento mesmo morando em outra cidade ou durante viagens.",
        icon: Globe,
      },
      {
        title: "Privacidade e sigilo",
        description:
          "As sessões por videochamada preservam a confidencialidade e o sigilo profissional, como no presencial.",
        icon: ShieldCheck,
      },
      {
        title: "Continuidade do cuidado",
        description:
          "Menos interrupções e faltas, ajudando a manter a regularidade e o vínculo ao longo do processo.",
        icon: CalendarCheck,
      },
      {
        title: "A mesma escuta de sempre",
        description:
          "A atenção, o acolhimento e a seriedade do trabalho permanecem os mesmos do atendimento presencial.",
        icon: Video,
      },
    ],
  },
};
