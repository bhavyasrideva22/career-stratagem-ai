import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "@/lib/assessment";

interface QuestionCardProps {
  question: Question;
  answer: any;
  onAnswer: (answer: any) => void;
}

export const QuestionCard = ({ question, answer, onAnswer }: QuestionCardProps) => {
  if (question.type === 'likert') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-2 max-w-2xl">
          {[1, 2, 3, 4, 5].map((value) => (
            <div key={value} className="text-center">
              <Button
                variant={answer === value ? "default" : "outline"}
                onClick={() => onAnswer(value)}
                className="w-full mb-2"
              >
                {value}
              </Button>
              <div className="text-xs text-muted-foreground">
                {value === 1 && "Strongly Disagree"}
                {value === 2 && "Disagree"}
                {value === 3 && "Neutral"}
                {value === 4 && "Agree"}
                {value === 5 && "Strongly Agree"}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === 'multiple-choice') {
    return (
      <RadioGroup value={answer} onValueChange={onAnswer}>
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-1 cursor-pointer p-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-colors"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    );
  }

  if (question.type === 'scenario') {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2">Scenario:</h4>
          <p className="text-muted-foreground">{question.scenarios?.situation}</p>
        </div>
        
        <RadioGroup value={answer} onValueChange={onAnswer}>
          <div className="space-y-3">
            {question.scenarios?.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label 
                  htmlFor={option.id} 
                  className="flex-1 cursor-pointer p-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/50 transition-colors"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    );
  }

  if (question.type === 'text') {
    return (
      <div className="space-y-4">
        <Textarea
          value={answer || ''}
          onChange={(e) => onAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="min-h-[100px]"
        />
      </div>
    );
  }

  return null;
};