export interface Question {
  id: string;
  question: string;
  description?: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'text';
  options?: string[];
  scenarios?: {
    situation: string;
    options: { id: string; text: string; score: number }[];
  };
  category: 'psychometric' | 'technical' | 'wiscar' | 'introduction';
  dimension?: 'will' | 'interest' | 'skill' | 'cognitive' | 'ability' | 'real_world_fit';
}

export interface AssessmentAnswers {
  [questionId: string]: any;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    real_world_fit: number;
  };
  overallConfidence: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  insights: string[];
  nextSteps: string[];
  careerMatches: string[];
  skillGaps: string[];
}

export const assessmentQuestions = {
  introduction: [
    {
      id: "intro_motivation",
      question: "What motivates you most about potentially becoming a Digital Strategy Manager?",
      type: "multiple-choice" as const,
      category: "introduction" as const,
      options: [
        "Leading digital transformation initiatives",
        "Analyzing data to drive strategic decisions",
        "Working with cross-functional teams",
        "Staying ahead of digital trends",
        "Building and executing strategic plans"
      ]
    },
    {
      id: "intro_experience",
      question: "How would you describe your current experience with digital strategy?",
      type: "multiple-choice" as const,
      category: "introduction" as const,
      options: [
        "Extensive experience in digital strategy roles",
        "Some experience in digital marketing or related fields",
        "Academic knowledge but limited practical experience",
        "Basic understanding, eager to learn more",
        "Complete beginner but highly interested"
      ]
    }
  ],
  psychometric: [
    {
      id: "psych_leadership",
      question: "I enjoy taking charge and leading teams through complex challenges.",
      type: "likert" as const,
      category: "psychometric" as const,
      dimension: "will" as const
    },
    {
      id: "psych_adaptation",
      question: "I thrive in environments where priorities and strategies frequently change.",
      type: "likert" as const,
      category: "psychometric" as const,
      dimension: "ability" as const
    },
    {
      id: "psych_innovation",
      question: "I actively seek out new digital tools and technologies to understand their potential.",
      type: "likert" as const,
      category: "psychometric" as const,
      dimension: "interest" as const
    },
    {
      id: "psych_analysis",
      question: "I prefer making decisions based on thorough data analysis rather than intuition alone.",
      type: "likert" as const,
      category: "psychometric" as const,
      dimension: "cognitive" as const
    },
    {
      id: "psych_collaboration",
      question: "I excel at building consensus among stakeholders with different priorities.",
      type: "likert" as const,
      category: "psychometric" as const,
      dimension: "skill" as const
    }
  ],
  technical: [
    {
      id: "tech_analytics",
      question: "Which digital analytics metric is most important for measuring customer acquisition effectiveness?",
      type: "multiple-choice" as const,
      category: "technical" as const,
      options: [
        "Customer Acquisition Cost (CAC)",
        "Customer Lifetime Value (CLV)",
        "CAC to CLV Ratio",
        "Conversion Rate",
        "Return on Ad Spend (ROAS)"
      ]
    },
    {
      id: "tech_scenario",
      question: "Your company's digital marketing ROI has declined 30% over 6 months. What's your first priority?",
      type: "scenario" as const,
      category: "technical" as const,
      scenarios: {
        situation: "Digital marketing ROI has declined significantly. You need to identify the root cause and develop a recovery plan.",
        options: [
          { id: "audit", text: "Conduct a comprehensive audit of all digital channels", score: 10 },
          { id: "budget", text: "Immediately reduce marketing budget to minimize losses", score: 3 },
          { id: "team", text: "Replace the marketing team leadership", score: 2 },
          { id: "attribution", text: "Review attribution models and measurement methodology", score: 8 },
          { id: "competitor", text: "Analyze competitor strategies and market changes", score: 7 }
        ]
      }
    },
    {
      id: "tech_frameworks",
      question: "Which framework is most effective for digital transformation planning?",
      type: "multiple-choice" as const,
      category: "technical" as const,
      options: [
        "SCRUM/Agile methodology",
        "McKinsey 7S Model",
        "Digital Maturity Assessment + Roadmapping",
        "Lean Startup methodology",
        "Design Thinking process"
      ]
    }
  ],
  wiscar: [
    {
      id: "wiscar_persistence",
      question: "When facing a major setback in a strategic initiative, I typically:",
      type: "multiple-choice" as const,
      category: "wiscar" as const,
      dimension: "will" as const,
      options: [
        "Immediately analyze what went wrong and adjust the approach",
        "Seek additional resources or support to overcome the obstacle",
        "Consider if the strategy needs fundamental revision",
        "Focus on quick wins to rebuild momentum",
        "Communicate transparently with stakeholders about challenges"
      ]
    },
    {
      id: "wiscar_learning",
      question: "How do you typically approach learning new digital technologies or methodologies?",
      type: "multiple-choice" as const,
      category: "wiscar" as const,
      dimension: "ability" as const,
      options: [
        "Hands-on experimentation and testing",
        "Structured courses and certifications",
        "Learning from industry experts and mentors",
        "Reading research papers and case studies",
        "Attending conferences and networking events"
      ]
    },
    {
      id: "wiscar_stakeholder",
      question: "You need to convince skeptical executives to invest in a new digital initiative. Your approach:",
      type: "scenario" as const,
      category: "wiscar" as const,
      dimension: "real_world_fit" as const,
      scenarios: {
        situation: "Executive leadership is hesitant about a digital investment you believe is crucial for the company's future.",
        options: [
          { id: "data", text: "Present comprehensive ROI projections and market data", score: 9 },
          { id: "pilot", text: "Propose a small pilot program to demonstrate value", score: 10 },
          { id: "competitor", text: "Show examples of competitors gaining advantage", score: 6 },
          { id: "risk", text: "Emphasize risks of not investing in digital capabilities", score: 7 },
          { id: "incremental", text: "Break the investment into smaller, incremental phases", score: 8 }
        ]
      }
    }
  ]
};

export const calculateResults = (answers: AssessmentAnswers): AssessmentResults => {
  // Calculate WISCAR scores
  const wiscarScores = {
    will: calculateDimensionScore(answers, 'will'),
    interest: calculateDimensionScore(answers, 'interest'),
    skill: calculateDimensionScore(answers, 'skill'),
    cognitive: calculateDimensionScore(answers, 'cognitive'),
    ability: calculateDimensionScore(answers, 'ability'),
    real_world_fit: calculateDimensionScore(answers, 'real_world_fit')
  };

  // Calculate section scores
  const psychometricScore = calculateSectionScore(answers, 'psychometric');
  const technicalScore = calculateSectionScore(answers, 'technical');
  
  // Calculate overall confidence
  const wiscarAverage = Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6;
  const overallConfidence = Math.round((psychometricScore + technicalScore + wiscarAverage) / 3);

  // Determine recommendation
  let recommendation: 'Yes' | 'Maybe' | 'No';
  if (overallConfidence >= 80) recommendation = 'Yes';
  else if (overallConfidence >= 60) recommendation = 'Maybe';
  else recommendation = 'No';

  // Generate insights and recommendations
  const insights = generateInsights(wiscarScores, psychometricScore, technicalScore);
  const nextSteps = generateNextSteps(recommendation, wiscarScores);
  const careerMatches = generateCareerMatches(wiscarScores, overallConfidence);
  const skillGaps = generateSkillGaps(wiscarScores, technicalScore);

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallConfidence,
    recommendation,
    insights,
    nextSteps,
    careerMatches,
    skillGaps
  };
};

function calculateDimensionScore(answers: AssessmentAnswers, dimension: string): number {
  const relevantQuestions = Object.values(assessmentQuestions).flat()
    .filter(q => 'dimension' in q && q.dimension === dimension);
  
  if (relevantQuestions.length === 0) return 70; // Default score if no questions for dimension
  
  let totalScore = 0;
  let count = 0;
  
  relevantQuestions.forEach(question => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      if (question.type === 'likert') {
        totalScore += answer * 20; // Convert 1-5 scale to 0-100
      } else if (question.type === 'scenario' && question.scenarios) {
        const selectedOption = question.scenarios.options.find(opt => opt.id === answer);
        totalScore += selectedOption ? selectedOption.score * 10 : 50;
      } else {
        totalScore += 70; // Default for other question types
      }
      count++;
    }
  });
  
  return count > 0 ? Math.round(totalScore / count) : 70;
}

function calculateSectionScore(answers: AssessmentAnswers, category: string): number {
  const relevantQuestions = Object.values(assessmentQuestions).flat()
    .filter(q => q.category === category);
  
  let totalScore = 0;
  let count = 0;
  
  relevantQuestions.forEach(question => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      if (question.type === 'likert') {
        totalScore += answer * 20;
      } else if (question.type === 'scenario' && question.scenarios) {
        const selectedOption = question.scenarios.options.find(opt => opt.id === answer);
        totalScore += selectedOption ? selectedOption.score * 10 : 50;
      } else if (question.type === 'multiple-choice') {
        // Score based on option position (later options typically better)
        const optionIndex = question.options?.indexOf(answer) || 0;
        totalScore += ((optionIndex + 1) / (question.options?.length || 1)) * 100;
      }
      count++;
    }
  });
  
  return count > 0 ? Math.round(totalScore / count) : 70;
}

function generateInsights(wiscarScores: any, psychometricScore: number, technicalScore: number): string[] {
  const insights = [];
  
  if (wiscarScores.will >= 80) {
    insights.push("Strong motivation and commitment to leadership roles");
  }
  if (wiscarScores.interest >= 80) {
    insights.push("High enthusiasm for digital strategy and innovation");
  }
  if (technicalScore >= 80) {
    insights.push("Solid technical foundation for strategic decision-making");
  }
  if (psychometricScore >= 80) {
    insights.push("Personality traits align well with leadership demands");
  }
  
  return insights.length > 0 ? insights : ["Shows potential with areas for development"];
}

function generateNextSteps(recommendation: string, wiscarScores: any): string[] {
  if (recommendation === 'Yes') {
    return [
      "Consider advanced digital strategy certification",
      "Seek mentorship from current digital strategy leaders",
      "Start building a portfolio of strategic initiatives"
    ];
  } else if (recommendation === 'Maybe') {
    return [
      "Focus on developing identified skill gaps",
      "Gain experience through digital marketing roles",
      "Complete foundational courses in data analytics"
    ];
  } else {
    return [
      "Explore related fields like digital marketing or business analysis",
      "Build foundational skills in data and technology",
      "Consider starting with coordinator or specialist roles"
    ];
  }
}

function generateCareerMatches(wiscarScores: any, overallConfidence: number): string[] {
  const matches = [];
  
  if (overallConfidence >= 80) {
    matches.push("Digital Strategy Manager", "Digital Transformation Lead");
  }
  if (wiscarScores.interest >= 75) {
    matches.push("Growth Marketing Manager", "Digital Product Manager");
  }
  if (wiscarScores.cognitive >= 75) {
    matches.push("Business Intelligence Manager", "Data Strategy Consultant");
  }
  
  return matches.length > 0 ? matches : ["Digital Marketing Specialist", "Business Analyst"];
}

function generateSkillGaps(wiscarScores: any, technicalScore: number): string[] {
  const gaps = [];
  
  if (technicalScore < 70) gaps.push("Digital analytics and measurement");
  if (wiscarScores.skill < 70) gaps.push("Stakeholder management and communication");
  if (wiscarScores.cognitive < 70) gaps.push("Strategic thinking and problem-solving");
  if (wiscarScores.ability < 70) gaps.push("Learning agility and adaptability");
  
  return gaps;
}