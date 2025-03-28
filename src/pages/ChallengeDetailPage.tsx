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
  const { user, profile } = useAuth();
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
      // For now, we'll use mock data with simple coding challenges
      const mockChallenge: ChallengeDetail = {
        id: challengeId || '',
        title: "Basic JavaScript Challenges",
        description: "Complete these simple coding challenges to test your JavaScript skills",
        difficulty: "Beginner",
        category: "Programming",
        xp: 50,
        timeLimit: 30,
        questions: [
          {
            id: "q1",
            type: "multiple_choice",
            question: "What is the correct way to declare a variable in JavaScript?",
            options: ["var x = 5", "let x = 5", "const x = 5", "All of the above"],
            correctAnswer: "All of the above",
            points: 10
          },
          {
            id: "q2",
            type: "code",
            question: `Write a function to add two numbers:
function add(a, b) {
  // Your code here
}

Example:
add(2, 3) should return 5
add(-1, 1) should return 0`,
            correctAnswer: `function add(a, b) {
  return a + b;
}`,
            points: 15
          },
          {
            id: "q3",
            type: "code",
            question: `Write a function to reverse a string:
function reverseString(str) {
  // Your code here
}

Example:
reverseString("hello") should return "olleh"
reverseString("world") should return "dlrow"`,
            correctAnswer: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
            points: 15
          },
          {
            id: "q4",
            type: "code",
            question: `Write a function to check if a number is even:
function isEven(num) {
  // Your code here
}

Example:
isEven(2) should return true
isEven(3) should return false`,
            correctAnswer: `function isEven(num) {
  return num % 2 === 0;
}`,
            points: 10
          },
          {
            id: "q5",
            type: "code",
            question: `Write a function to find the largest number in an array:
function findLargest(arr) {
  // Your code here
}

Example:
findLargest([1, 5, 3, 9, 2]) should return 9
findLargest([10, 20, 30]) should return 30`,
            correctAnswer: `function findLargest(arr) {
  return Math.max(...arr);
}`,
            points: 15
          }
        ],
        assignments: []
      };

      // Add more challenges based on challenge type
      if (challengeId === "c1") {
        mockChallenge.title = "HTML & CSS Basics";
        mockChallenge.description = "Test your HTML and CSS knowledge";
        mockChallenge.questions = [
          {
            id: "q1",
            type: "multiple_choice",
            question: "Which HTML tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correctAnswer: "<a>",
            points: 10
          },
          {
            id: "q2",
            type: "code",
            question: `Create a simple HTML button with CSS styling:
1. Button should be blue
2. Text should be white
3. Add hover effect
4. Add rounded corners

Your code should include both HTML and CSS.`,
            correctAnswer: `<button class="styled-button">Click me</button>

<style>
.styled-button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.styled-button:hover {
  background-color: darkblue;
}
</style>`,
            points: 20
          }
        ];
      }

      if (challengeId === "c2") {
        mockChallenge.title = "Python Basics";
        mockChallenge.description = "Simple Python programming challenges";
        mockChallenge.questions = [
          {
            id: "q1",
            type: "multiple_choice",
            question: "Which of the following is NOT a Python data type?",
            options: ["int", "string", "char", "float"],
            correctAnswer: "char",
            points: 10
          },
          {
            id: "q2",
            type: "code",
            question: `Write a Python function to calculate the factorial of a number:
def factorial(n):
    # Your code here

Example:
factorial(5) should return 120
factorial(3) should return 6`,
            correctAnswer: `def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)`,
            points: 20
          }
        ];
      }

      if (challengeId === "c3") {
        mockChallenge.title = "SQL Basics";
        mockChallenge.description = "Basic SQL query challenges";
        mockChallenge.questions = [
          {
            id: "q1",
            type: "multiple_choice",
            question: "Which SQL keyword is used to retrieve data from a database?",
            options: ["GET", "SELECT", "FETCH", "RETRIEVE"],
            correctAnswer: "SELECT",
            points: 10
          },
          {
            id: "q2",
            type: "code",
            question: `Write a SQL query to find all users who are older than 18:
Table: users
Columns: id, name, age, email

Your query should:
1. Select all columns
2. Filter users by age
3. Order results by name`,
            correctAnswer: `SELECT *
FROM users
WHERE age > 18
ORDER BY name;`,
            points: 20
          }
        ];
      }

      setChallenge(mockChallenge);
      if (mockChallenge.timeLimit) {
        setTimeLeft(mockChallenge.timeLimit * 60);
      }
    } catch (error) {
      console.error('Error fetching challenge details:', error);
      toast({
        title: "Error",
        description: "Failed to load challenge details. Please try again.",
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
        if (question.type === 'code') {
          // For code questions, we'll do a basic string comparison
          // In a real app, you'd want to use a proper code evaluation system
          const normalizedUserAnswer = typeof userAnswer === 'string' ? userAnswer.replace(/\s+/g, ' ').trim() : '';
          const normalizedCorrectAnswer = typeof question.correctAnswer === 'string' ? question.correctAnswer.replace(/\s+/g, ' ').trim() : '';
          if (normalizedUserAnswer === normalizedCorrectAnswer) {
            totalScore += question.points;
          } else {
            // Partial credit for code questions
            totalScore += question.points * 0.5;
          }
        } else if (Array.isArray(question.correctAnswer)) {
          if (Array.isArray(userAnswer) && 
              question.correctAnswer.length === userAnswer.length &&
              question.correctAnswer.every(ans => userAnswer.includes(ans))) {
            totalScore += question.points;
          }
        } else if (userAnswer === question.correctAnswer) {
          totalScore += question.points;
        }
      });

      // Calculate rewards based on performance
      const maxPossibleScore = challenge.questions.reduce((sum, q) => sum + q.points, 0);
      const performancePercentage = (totalScore / maxPossibleScore) * 100;
      
      // Calculate credits based on performance
      let earnedCredits = 0;
      if (performancePercentage >= 90) {
        earnedCredits = challenge.xp * 1.5; // 150% of base XP for excellent performance
      } else if (performancePercentage >= 75) {
        earnedCredits = challenge.xp * 1.25; // 125% of base XP for good performance
      } else if (performancePercentage >= 60) {
        earnedCredits = challenge.xp; // Base XP for passing performance
      } else {
        earnedCredits = challenge.xp * 0.5; // 50% of base XP for below passing
      }

      // Update progress and rewards in database
      const { error: progressError } = await supabase
        .from('challenge_progress')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          score: totalScore,
          earned_credits: earnedCredits,
          submission: assignmentSubmission
        })
        .eq('challenge_id', challenge.id)
        .eq('user_id', user.id);

      if (progressError) {
        console.error('Error updating progress:', progressError);
        throw new Error("Failed to update challenge progress");
      }

      // Update user's credits
      const { error: creditsError } = await supabase
        .from('profiles')
        .update({
          credits: (profile?.credits || 0) + earnedCredits
        })
        .eq('id', user.id);

      if (creditsError) {
        console.error('Error updating credits:', creditsError);
        throw new Error("Failed to update user credits");
      }

      toast({
        title: "Challenge Completed!",
        description: `You earned ${earnedCredits} credits with a score of ${totalScore}/${maxPossibleScore} (${Math.round(performancePercentage)}%)`,
      });

      navigate('/challenges');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit your answers. Please try again.",
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
      const { error: submissionError } = await supabase
        .from('challenge_progress')
        .update({
          submission: assignmentSubmission,
          submitted_at: new Date().toISOString()
        })
        .eq('challenge_id', challenge.id)
        .eq('user_id', user.id);

      if (submissionError) throw submissionError;

      // Award base credits for submitting the assignment
      const earnedCredits = challenge.xp * 0.5; // 50% of base XP for submission

      // Update user's credits
      const { error: creditsError } = await supabase
        .from('profiles')
        .update({
          credits: (profile?.credits || 0) + earnedCredits
        })
        .eq('id', user.id);

      if (creditsError) throw creditsError;

      toast({
        title: "Assignment Submitted",
        description: `You earned ${earnedCredits} credits for submitting your assignment. Additional credits may be awarded after review.`,
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