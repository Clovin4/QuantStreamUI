import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth0 } from '@auth0/auth0-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Please enter your username' })
    .nonempty({ message: 'Username cannot be empty' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
});

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    setError(null);
    try {
      await loginWithRedirect({
        username: data.username,
        password: data.password,
      });
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('grid gap-2', className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-1'>
          <label>Username</label>
          <Input placeholder='Username' {...form.register('username')} />
          {form.formState.errors.username && (
            <p className='text-red-500'>{form.formState.errors.username.message}</p>
          )}
        </div>
        <div className='space-y-1'>
          <div className='flex items-center justify-between'>
            <label>Password</label>
            <Link
              to='/forgot-password'
              className='text-sm font-medium text-muted-foreground hover:opacity-75'
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput placeholder='********' {...form.register('password')} />
          {form.formState.errors.password && (
            <p className='text-red-500'>{form.formState.errors.password.message}</p>
          )}
        </div>
        {error && <div className='text-red-500'>{error}</div>}
        <Button type='submit' className='mt-2' loading={isLoading}>
          Login with Auth0
        </Button>
      </form>
    </div>
  );
}

export default UserAuthForm;