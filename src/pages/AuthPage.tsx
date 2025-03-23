
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

const signupSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }).optional(),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthPage = () => {
  const { signIn, signUp, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(
    location.pathname === '/signup' ? 'signup' : 'login'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      setFormError('');
      setIsSubmitting(true);
      await signIn(values.email, values.password);
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      setFormError(error.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignupSubmit = async (values: SignupFormValues) => {
    try {
      setFormError('');
      setIsSubmitting(true);
      await signUp(values.email, values.password, values.username);
      toast({
        title: "Verification email sent",
        description: "Please check your email to verify your account.",
      });
      // Switch to login tab after successful signup
      setActiveTab('login');
    } catch (error: any) {
      console.error('Signup error:', error);
      setFormError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8 px-4">
        <Card className="w-full max-w-md animate-fade-in">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="animate-fade-in" style={{ "--index": "1" } as React.CSSProperties}>Welcome Back</CardTitle>
                <CardDescription className="animate-fade-in" style={{ "--index": "2" } as React.CSSProperties}>Sign in to your ByteBolt account</CardDescription>
              </CardHeader>
              <CardContent>
                {formError && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4 animate-fade-in">
                    {formError}
                  </div>
                )}
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in" style={{ "--index": "3" } as React.CSSProperties}>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="you@example.com" 
                              {...field} 
                              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in" style={{ "--index": "4" } as React.CSSProperties}>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder="••••••••" 
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">
                                {showPassword ? "Hide password" : "Show password"}
                              </span>
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className={cn(
                        "w-full transition-all duration-300 animate-fade-in hover:shadow-md",
                        isSubmitting && "opacity-70"
                      )} 
                      disabled={isLoading || isSubmitting}
                      style={{ "--index": "5" } as React.CSSProperties}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle className="animate-fade-in" style={{ "--index": "1" } as React.CSSProperties}>Create an Account</CardTitle>
                <CardDescription className="animate-fade-in" style={{ "--index": "2" } as React.CSSProperties}>Join ByteBolt to access all features</CardDescription>
              </CardHeader>
              <CardContent>
                {formError && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4 animate-fade-in">
                    {formError}
                  </div>
                )}
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in" style={{ "--index": "3" } as React.CSSProperties}>
                          <FormLabel>Username (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="coolcoder" 
                              {...field}
                              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in" style={{ "--index": "4" } as React.CSSProperties}>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="you@example.com" 
                              {...field}
                              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in" style={{ "--index": "5" } as React.CSSProperties}>
                          <FormLabel>Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder="••••••••" 
                                {...field}
                                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">
                                {showPassword ? "Hide password" : "Show password"}
                              </span>
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in" style={{ "--index": "6" } as React.CSSProperties}>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field} 
                              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className={cn(
                        "w-full transition-all duration-300 animate-fade-in hover:shadow-md",
                        isSubmitting && "opacity-70"
                      )} 
                      disabled={isLoading || isSubmitting}
                      style={{ "--index": "7" } as React.CSSProperties}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </TabsContent>
          </Tabs>
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-sm text-muted-foreground animate-fade-in">
              {activeTab === 'login' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <Button 
                variant="link" 
                className="p-0 transition-colors hover:text-primary" 
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
              >
                {activeTab === 'login' ? 'Sign Up' : 'Sign In'}
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AuthPage;
