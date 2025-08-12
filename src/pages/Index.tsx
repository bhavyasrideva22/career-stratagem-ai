import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Users, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge 
            variant="secondary" 
            className="mb-6 px-4 py-2 text-sm font-medium"
          >
            🧭 Professional Career Assessment
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Is <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Digital Strategy Management
            </span><br />
            Your Next Career Move?
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover if you have the mindset, skills, and motivation to succeed as a Digital Strategy Manager. 
            Our comprehensive assessment evaluates your readiness using proven frameworks.
          </p>
          
          <Button 
            variant="hero" 
            size="xl" 
            onClick={() => navigate("/assessment")}
            className="mb-8"
          >
            Start Your Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              20-30 minutes
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Scientifically validated
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Personalized insights
            </div>
          </div>
        </div>
      </section>

      {/* What is Digital Strategy Management */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20 mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">What is Digital Strategy Management?</CardTitle>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                A Digital Strategy Manager leads the planning and execution of an organization's digital transformation, 
                marketing, and growth initiatives by aligning business goals with digital technologies, customer insights, 
                and emerging trends.
              </p>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Typical Careers */}
            <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-3" />
                <CardTitle className="text-xl">Typical Career Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Digital Strategy Manager</li>
                  <li>• Digital Marketing Director</li>
                  <li>• Growth Strategist</li>
                  <li>• Business Transformation Manager</li>
                  <li>• Digital Product Manager</li>
                </ul>
              </CardContent>
            </Card>

            {/* Key Traits */}
            <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <Brain className="w-8 h-8 text-accent mb-3" />
                <CardTitle className="text-xl">Key Traits for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Strategic & analytical thinking</li>
                  <li>• Strong leadership skills</li>
                  <li>• Adaptability to change</li>
                  <li>• Creative problem-solving</li>
                  <li>• Data-driven decision making</li>
                  <li>• Stakeholder management</li>
                </ul>
              </CardContent>
            </Card>

            {/* Assessment Framework */}
            <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <Target className="w-8 h-8 text-primary mb-3" />
                <CardTitle className="text-xl">WISCAR Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>W</strong>ill - Motivation & persistence</li>
                  <li>• <strong>I</strong>nterest - Genuine curiosity</li>
                  <li>• <strong>S</strong>kill - Current capabilities</li>
                  <li>• <strong>C</strong>ognitive - Analytical thinking</li>
                  <li>• <strong>A</strong>bility - Learning agility</li>
                  <li>• <strong>R</strong>eal-world fit - Practical readiness</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Sections */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Assessment Sections</h2>
            <p className="text-lg text-muted-foreground">
              Our multi-dimensional evaluation covers all aspects of career readiness
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <Badge variant="secondary" className="mb-3 w-fit">Section 1</Badge>
                <CardTitle>Psychometric Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Evaluate personality traits, working preferences, and motivation alignment with digital leadership roles.
                </p>
                <div className="text-xs text-muted-foreground">
                  • Interest scales • Personality compatibility • Growth mindset assessment
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-card)] border-0 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <Badge variant="secondary" className="mb-3 w-fit">Section 2</Badge>
                <CardTitle>Technical & Aptitude</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Test logical reasoning, digital knowledge, and strategic thinking capabilities.
                </p>
                <div className="text-xs text-muted-foreground">
                  • Scenario analysis • Digital frameworks • Problem-solving skills
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Discover Your Career Fit?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take our comprehensive assessment and receive personalized insights, 
            career recommendations, and a clear development roadmap.
          </p>
          
          <Button 
            variant="assessment" 
            size="xl" 
            onClick={() => navigate("/assessment")}
          >
            Begin Assessment Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
