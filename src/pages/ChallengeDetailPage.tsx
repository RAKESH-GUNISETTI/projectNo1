import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'code';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  deadline: string;
  submissionType: 'text' | 'code' | 'file';
  maxPoints: number;
}

interface ChallengeDetail {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  xp: number;
  questions: Question[];
  assignments: Assignment[];
  timeLimit?: number; // in minutes
}

const ChallengeDetailPage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [assignmentSubmission, setAssignmentSubmission] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (challengeId) {
      fetchChallengeDetails();
    }
  }, [challengeId]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev !== null ? prev - 1 : null);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const fetchChallengeDetails = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would fetch from your backend
      // For now, we'll use mock data
      const mockChallenge: ChallengeDetail = {
        id: challengeId || '',
        title: "Build a Responsive Nav Menu",
        description: "Create a responsive navigation menu that adapts to different screen sizes using CSS and JavaScript.",
        difficulty: "Beginner",
        category: "Frontend",
        xp: 100,
        timeLimit: 60,
        questions: [
          {
            id: "q1",
            type: "multiple_choice",
            question: "Which CSS property is used to make a flex container wrap its items?",
            options: ["flex-wrap", "flex-flow", "flex-direction", "flex-basis"],
            correctAnswer: "flex-wrap",
            points: 10
          },
          {
            id: "q2",
            type: "true_false",
            question: "Media queries are used to make websites responsive.",
            options: ["True", "False"],
            correctAnswer: "True",
            points: 5
          }
        ],
        assignments: [
          {
            id: "a1",
            title: "Create Navigation Menu",
            description: "Build a responsive navigation menu using HTML, CSS, and JavaScript",
            instructions: "Create a navigation menu that:\n1. Is responsive\n2. Has a hamburger menu for mobile\n3. Includes smooth transitions\n4. Is accessible",
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            submissionType: "code",
            maxPoints: 50
          }
        ]
      };

      setChallenge(mockChallenge);
      if (mockChallenge.timeLimit) {
        setTimeLeft(mockChallenge.timeLimit * 60);
      }
    } catch (error) {
      console.error('Error fetching challenge details:', error);
      toast({
        title: "Error",
        description: "Failed to load challenge details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (challenge && currentQuestionIndex < challenge.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!challenge || !user) return;

    try {
      setIsSubmitting(true);
      let totalScore = 0;

      // Calculate score
      challenge.questions.forEach(question => {
        const userAnswer = answers[question.id];
        if (Array.isArray(question.correctAnswer)) {
          if (Array.isArray(userAnswer) && 
              question.correctAnswer.length === userAnswer.length &&
              question.correctAnswer.every(ans => userAnswer.includes(ans))) {
            totalScore += question.points;
          }
        } else if (userAnswer === question.correctAnswer) {
          totalScore += question.points;
        }
      });

      // Update progress in database
      const { error } = await supabase
        .from('challenge_progress')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          score: totalScore
        })
        .eq('challenge_id', challenge.id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Quiz Completed",
        description: `Your score: ${totalScore} points`,
      });

      navigate('/challenges');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast({
        title: "Error",
        description: "Failed to submit your answers.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAssignment = async () => {
    if (!challenge || !user) return;

    try {
      setIsSubmitting(true);

      // In a real app, you would handle file uploads here
      const { error } = await supabase
        .from('assignment_submissions')
        .insert([{
          challenge_id: challenge.id,
          user_id: user.id,
          assignment_id: challenge.assignments[0].id,
          submission: assignmentSubmission,
          submitted_at: new Date().toISOString()
        }]);

      if (error) throw error;

      toast({
        title: "Assignment Submitted",
        description: "Your submission has been received.",
      });

      navigate('/challenges');
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast({
        title: "Error",
        description: "Failed to submit your assignment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  if (!challenge) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Challenge not found</h1>
          <Button onClick={() => navigate('/challenges')} className="mt-4">
            Return to Challenges
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">{challenge.title}</h1>
            <p className="text-muted-foreground mt-2">{challenge.description}</p>
            <div className="flex gap-2 mt-4">
              <Badge variant="secondary">{challenge.difficulty}</Badge>
              <Badge variant="secondary">{challenge.category}</Badge>
            </div>
          </div>
          {timeLeft !== null && (
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="font-mono">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Quiz Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quiz</CardTitle>
            <CardDescription>
              Answer the following questions to complete the challenge
            </CardDescription>
          </CardHeader>
          <CardContent>
            {challenge.questions.map((question, index) => (
              <div
                key={question.id}
                className={`mb-8 ${index === currentQuestionIndex ? 'block' : 'hidden'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                  <span className="text-sm text-muted-foreground">
                    {question.points} points
                  </span>
                </div>
                <p className="mb-4">{question.question}</p>

                {question.type === 'multiple_choice' && (
                  <RadioGroup
                    value={answers[question.id] as string}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                  >
                    {question.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === 'true_false' && (
                  <RadioGroup
                    value={answers[question.id] as string}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                  >
                    {question.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === 'short_answer' && (
                  <Input
                    value={answers[question.id] as string || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder="Type your answer here..."
                  />
                )}

                {question.type === 'code' && (
                  <Textarea
                    value={answers[question.id] as string || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder="Write your code here..."
                    className="font-mono"
                    rows={10}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              {currentQuestionIndex === challenge.questions.length - 1 ? (
                <Button onClick={handleSubmitQuiz} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Quiz'
                  )}
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Assignment Section */}
        {challenge.assignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle>{assignment.title}</CardTitle>
              <CardDescription>
                {assignment.description}
                <div className="mt-2">
                  <span className="text-sm text-muted-foreground">
                    Due: {new Date(assignment.deadline).toLocaleDateString()}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none mb-6">
                <pre className="whitespace-pre-wrap">{assignment.instructions}</pre>
              </div>

              {assignment.submissionType === 'code' && (
                <Textarea
                  value={assignmentSubmission}
                  onChange={(e) => setAssignmentSubmission(e.target.value)}
                  placeholder="Write your code here..."
                  className="font-mono"
                  rows={10}
                />
              )}

              {assignment.submissionType === 'text' && (
                <Textarea
                  value={assignmentSubmission}
                  onChange={(e) => setAssignmentSubmission(e.target.value)}
                  placeholder="Write your answer here..."
                  rows={10}
                />
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmitAssignment} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Assignment'
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default ChallengeDetailPage; 