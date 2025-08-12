import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { assessmentQuestions, calculateResults, AssessmentAnswers } from "@/lib/assessment";

const Assessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const sections = [
    { name: "Introduction", questions: assessmentQuestions.introduction },
    { name: "Psychometric", questions: assessmentQuestions.psychometric },
    { name: "Technical & Aptitude", questions: assessmentQuestions.technical },
    { name: "WISCAR Framework", questions: assessmentQuestions.wiscar }
  ];

  const currentQuestions = sections[currentSection]?.questions || [];
  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
    } else {
      // Assessment completed
      const results = calculateResults(answers);
      navigate("/results", { state: { results, answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const currentQuestionData = currentQuestions[currentQuestion];
  const questionId = currentQuestionData?.id;
  const hasAnswer = questionId && answers[questionId] !== undefined;
  const canProceed = hasAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Digital Strategy Manager Assessment
            </h1>
            <p className="text-muted-foreground mb-4">
              Section {currentSection + 1} of {sections.length}: {sections[currentSection]?.name}
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{answeredQuestions} answered</span>
                <span>{totalQuestions} total</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">
                  Question {currentQuestion + 1} of {currentQuestions.length}
                </Badge>
                {hasAnswer && (
                  <Badge variant="default" className="bg-success text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Answered
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl">
                {currentQuestionData?.question}
              </CardTitle>
              {currentQuestionData && 'description' in currentQuestionData && currentQuestionData.description && (
                <p className="text-muted-foreground">
                  {String(currentQuestionData.description)}
                </p>
              )}
            </CardHeader>
            <CardContent>
              {currentQuestionData && (
                <QuestionCard
                  question={currentQuestionData}
                  answer={answers[questionId!]}
                  onAnswer={(answer) => handleAnswer(questionId!, answer)}
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSection === 0 && currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              variant="assessment"
              onClick={handleNext}
              disabled={!canProceed}
              size="lg"
            >
              {currentSection === sections.length - 1 && currentQuestion === currentQuestions.length - 1
                ? "Complete Assessment"
                : "Next"
              }
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;