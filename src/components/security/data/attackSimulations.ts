
import { AttackSimulation } from "../types";

export const simulatedAttacks: AttackSimulation[] = [
  {
    trigger: "password",
    attack: "Your password appears to be weak. Click here to update it: http://security-update.totallylegit.com",
    defense: "This is a phishing attempt! Never click on suspicious links asking for your password, even if they look legitimate.",
    points: 50,
    attackType: "Phishing",
    quiz: {
      question: "Que tipo de ataque foi simulado?",
      options: ["Malware", "Phishing", "Social Engineering", "DDoS"],
      correctAnswer: 1,
      explanation: "Este foi um ataque de Phishing - uma tentativa de roubar credenciais através de links maliciosos que imitam sites legítimos.",
      prevention: "Para evitar phishing: 1) Sempre verifique URLs antes de clicar, 2) Digite URLs manualmente no navegador, 3) Use autenticação de dois fatores, 4) Mantenha-se atualizado sobre técnicas de phishing, 5) Nunca forneça credenciais através de links em emails."
    }
  },
  {
    trigger: "help",
    attack: "I'm from IT support. We detected unusual activity on your account. Please download this security patch: securitypatch.exe",
    defense: "This is a social engineering attack! IT will never ask you to download files through chat. Always verify through official channels.",
    points: 75,
    attackType: "Social Engineering",
    quiz: {
      question: "Qual foi o tipo de ataque utilizado?",
      options: ["Ransomware", "Social Engineering", "Man-in-the-Middle", "SQL Injection"],
      correctAnswer: 1,
      explanation: "Este foi um ataque de Engenharia Social - manipulação psicológica para fazer a vítima executar ações que comprometam a segurança.",
      prevention: "Para evitar engenharia social: 1) Sempre verifique a identidade através de canais oficiais, 2) Seja cético com solicitações urgentes, 3) Nunca baixe arquivos de fontes não verificadas, 4) Treine funcionários sobre essas táticas, 5) Estabeleça protocolos claros para solicitações de TI."
    }
  },
  {
    trigger: "access",
    attack: "I need temporary access to your account to fix a server issue. Can you share your login credentials?",
    defense: "This is a credential harvesting attempt! Never share your login details with anyone, even if they claim to be from IT.",
    points: 100,
    attackType: "Credential Harvesting",
    quiz: {
      question: "Este ataque é classificado como:",
      options: ["Credential Harvesting", "Keylogger", "Brute Force", "Password Spray"],
      correctAnswer: 0,
      explanation: "Este foi um ataque de Coleta de Credenciais - tentativa direta de obter login e senha através de solicitação fraudulenta.",
      prevention: "Para evitar coleta de credenciais: 1) Nunca compartilhe senhas com ninguém, 2) Use senhas únicas para cada conta, 3) Implemente autenticação multifator, 4) Eduque sobre políticas de senha, 5) Use gerenciadores de senha."
    }
  },
  {
    trigger: "urgent",
    attack: "URGENT: Your account will be suspended in 1 hour. Verify your identity by providing your employee ID and date of birth.",
    defense: "This is creating false urgency! Legitimate communications don't pressure you to act quickly without verification.",
    points: 60,
    attackType: "Urgency Scam",
    quiz: {
      question: "Que tática foi usada neste ataque?",
      options: ["Urgency Scam", "Spear Phishing", "Watering Hole", "Pretexting"],
      correctAnswer: 0,
      explanation: "Este foi um Golpe de Urgência - criar falsa pressão temporal para fazer a vítima agir sem pensar adequadamente.",
      prevention: "Para evitar golpes de urgência: 1) Sempre tome tempo para verificar, 2) Contate a organização por canais oficiais, 3) Desconfie de prazos artificiais, 4) Verifique a legitimidade antes de agir, 5) Nunca forneça dados pessoais sob pressão."
    }
  },
  {
    trigger: "file",
    attack: "Here's the document you requested: QuarterlyReport.docx.exe",
    defense: "Watch out for suspicious file extensions! Executable files (.exe) disguised as documents are a common attack vector.",
    points: 80,
    attackType: "Malware",
    quiz: {
      question: "Qual tipo de ataque foi tentado?",
      options: ["Trojans", "Malware", "Spyware", "Adware"],
      correctAnswer: 1,
      explanation: "Este foi um ataque de Malware - software malicioso disfarçado como documento legítimo com dupla extensão (.docx.exe).",
      prevention: "Para evitar malware: 1) Sempre verifique extensões de arquivo, 2) Use antivírus atualizado, 3) Não execute arquivos suspeitos, 4) Mantenha software atualizado, 5) Faça backup regular dos dados."
    }
  },
  {
    trigger: "wifi",
    attack: "Connect to our free WiFi network 'Free_Internet_Here' - no password required! Just click here to accept terms: bit.ly/freewifi123",
    defense: "This is an evil twin attack! Avoid connecting to suspicious open networks and never click on shortened URLs from unknown sources.",
    points: 90,
    attackType: "Evil Twin",
    quiz: {
      question: "Este é um exemplo de qual ataque?",
      options: ["Evil Twin", "WPS Attack", "WEP Cracking", "Rogue Access Point"],
      correctAnswer: 0,
      explanation: "Este foi um ataque Evil Twin - criação de rede WiFi falsa que imita uma legítima para interceptar dados.",
      prevention: "Para evitar Evil Twin: 1) Evite redes WiFi abertas, 2) Verifique nomes de rede com funcionários, 3) Use VPN em redes públicas, 4) Desative conexão automática, 5) Use dados móveis quando possível."
    }
  },
  {
    trigger: "bank",
    attack: "ALERT: Suspicious activity detected on your bank account. Please verify your details immediately: chase-security-check.net",
    defense: "This is a banking phishing scam! Banks never ask for credentials via email. Always navigate directly to the official website.",
    points: 85,
    attackType: "Banking Phishing",
    quiz: {
      question: "Que tipo específico de phishing foi usado?",
      options: ["Spear Phishing", "Banking Phishing", "Whaling", "Vishing"],
      correctAnswer: 1,
      explanation: "Este foi um Phishing Bancário - tentativa específica de roubar credenciais bancárias imitando comunicações oficiais do banco.",
      prevention: "Para evitar phishing bancário: 1) Bancos nunca pedem credenciais por email, 2) Sempre acesse o site oficial digitando a URL, 3) Verifique certificados SSL, 4) Use aplicativos oficiais do banco, 5) Configure alertas de transações."
    }
  }
];

export const getRandomAttack = () => {
  const randomIndex = Math.floor(Math.random() * simulatedAttacks.length);
  return simulatedAttacks[randomIndex];
};
