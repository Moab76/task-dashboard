import { Task } from '../../features/tasks/services/task-data';

export const TASKS_MOCK: Task[] = [
  {
    id: 1,
    title: "Reunião de equipe",
    description: "Discutir novos projetos para Q4",
    dueDate: new Date("2023-12-15"),
    completed: true
  },
  {
    id: 2,
    title: "Atualizar documentação",
    dueDate: new Date("2023-11-30"),
    completed: false
  },
  {
    id: 3,
    title: "Fazer compras",
    description: "Leite, ovos, pão e frutas",
    completed: false
  },
  {
    id: 4,
    title: "Enviar relatório mensal",
    dueDate: new Date("2023-11-25"),
    completed: true
  },
  {
    id: 5,
    title: "Agendar dentista",
    completed: false
  },
  {
    id: 6,
    title: "Refatorar módulo de autenticação",
    description: "Implementar OAuth2",
    dueDate: new Date("2023-12-10"),
    completed: false
  },
  {
    id: 7,
    title: "Estudar Angular 20",
    dueDate: new Date("2023-12-05"),
    completed: true
  },
  {
    id: 8,
    title: "Preparar apresentação",
    description: "Para conferência de tecnologia",
    completed: false
  },
  {
    id: 9,
    title: "Configurar CI/CD",
    dueDate: new Date("2023-11-28"),
    completed: true
  },
  {
    id: 10,
    title: "Revisar pull requests",
    description: "Time frontend",
    dueDate: new Date("2023-11-27"),
    completed: false
  },
  {
    id: 11,
    title: "Fazer backup do servidor",
    completed: true
  },
  {
    id: 12,
    title: "Escrever testes unitários",
    description: "Módulo de pagamentos",
    dueDate: new Date("2023-12-01"),
    completed: false
  },
  {
    id: 13,
    title: "Atualizar dependências",
    dueDate: new Date("2023-12-03"),
    completed: true
  },
  {
    id: 14,
    title: "Plantar novas mudas",
    description: "Jardim da entrada",
    completed: false
  },
  {
    id: 15,
    title: "Agendar férias",
    dueDate: new Date("2023-12-20"),
    completed: false
  },
  {
    id: 16,
    title: "Otimizar consultas do banco",
    description: "Analisar queries lentas",
    completed: true
  },
  {
    id: 17,
    title: "Renovar assinaturas",
    dueDate: new Date("2023-11-29"),
    completed: false
  },
  {
    id: 18,
    title: "Criar wireframes",
    description: "Novo dashboard admin",
    completed: true
  },
  {
    id: 19,
    title: "Ler livro técnico",
    dueDate: new Date("2023-12-17"),
    completed: false
  },
  {
    id: 20,
    title: "Doar roupas usadas",
    completed: true
  }
];
