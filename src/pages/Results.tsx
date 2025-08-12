import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Share2, TrendingUp, Target, BookOpen, Users } from "lucide-react";
import { AssessmentResults } from "@/lib/assessment";
import { RadarChart } from "@/components/charts/RadarChart";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, answers } = location.state as { results: AssessmentResults; answers: any } || {};

  if (!results) {
    navigate("/");
    return null;
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes':
        return 'bg-success text-white';
      case 'Maybe':
        return 'bg-warning text-white';
      case 'No':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConfidenceLevel = (score: number) => {
    if (score >= 85) return { level: "Very High", color: "text-success" };
    if (score >= 70) return { level: "High", color: "text-accent" };
    if (score >= 55) return { level: "Moderate", color: "text-warning" };
    return { level: "Developing", color: "text-muted-foreground" };
  };

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
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Your Assessment Results
            </h1>
            <p className="text-muted-foreground mb-6">
              Comprehensive analysis of your Digital Strategy Manager readiness
            </p>
          </div>
        </div>

        {/* Main Recommendation */}
        <Card className="mb-8 shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4">
              <Badge 
                className={`text-lg px-6 py-2 ${getRecommendationColor(results.recommendation)}`}
              >
                {results.recommendation === 'Yes' && 'Ready to Pursue'}
                {results.recommendation === 'Maybe' && 'Develop & Pursue'}
                {results.recommendation === 'No' && 'Explore Alternatives'}
              </Badge>
            </div>
            <CardTitle className="text-2xl mb-2">
              Digital Strategy Manager Career Fit
            </CardTitle>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {results.overallConfidence}%
                </div>
                <div className={`text-sm ${getConfidenceLevel(results.overallConfidence).color}`}>
                  {getConfidenceLevel(results.overallConfidence).level} Confidence
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* WISCAR Analysis */}
          <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                WISCAR Framework Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadarChart data={results.wiscarScores} />
              <div className="mt-4 space-y-3">
                {Object.entries(results.wiscarScores).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Progress value={value} className="w-20 h-2" />
                      <span className="text-sm font-semibold w-8">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Core Scores */}
          <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Core Assessment Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Psychometric Fit</span>
                  <span className="font-semibold">{results.psychometricScore}%</span>
                </div>
                <Progress value={results.psychometricScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <span className="font-semibold">{results.technicalScore}%</span>
                </div>
                <Progress value={results.technicalScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Overall Confidence</span>
                  <span className="font-semibold">{results.overallConfidence}%</span>
                </div>
                <Progress value={results.overallConfidence} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights & Recommendations */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Key Insights */}
          <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Career Matches */}
          <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Career Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.careerMatches.map((career, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {career}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps & Skill Gaps */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Next Steps */}
          <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center flex-shrink-0 font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Skill Gaps */}
          <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
            <CardHeader>
              <CardTitle>Areas for Development</CardTitle>
            </CardHeader>
            <CardContent>
              {results.skillGaps.length > 0 ? (
                <ul className="space-y-2">
                  {results.skillGaps.map((gap, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full flex-shrink-0" />
                      <span className="text-sm">{gap}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No major skill gaps identified. You're well-prepared!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button variant="hero" size="lg" className="gap-2">
            <Download className="w-4 h-4" />
            Download Results
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
          <Button 
            variant="assessment" 
            size="lg"
            onClick={() => navigate("/")}
          >
            Take Another Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;