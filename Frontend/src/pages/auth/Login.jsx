import { useState } from 'react';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { login, googleLogin } = useAuth();

	const [formData, setFormData] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await login(formData);
			const redirectPath = location.state?.from || '/problems';
			navigate(redirectPath, { replace: true });
		} catch (err) {
			setError(err || 'Invalid credentials. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSuccess = async (credentialResponse) => {
		try {
			setLoading(true);
			setError(null);
			await googleLogin(credentialResponse.credential);
			const redirectPath = location.state?.from || '/problems';
			navigate(redirectPath, { replace: true });
		} catch (err) {
			setError(err || 'Google login failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#1a1a1a] text-black dark:text-white px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8 rounded-xl border border-gray-200 bg-white p-8 dark:border-[#2f2f2f] dark:bg-[#262626]">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
						Welcome back
					</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Please sign in to your account
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<div className="relative">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full rounded-lg border border-gray-300 bg-gray-100 py-3 pl-10 pr-3 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:border-yellow-500 focus:outline-none dark:border-[#2f2f2f] dark:bg-[#2a2a2a] dark:text-gray-200 dark:placeholder-gray-500"
									placeholder="Email address"
									value={formData.email}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<div className="relative">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-lg border border-gray-300 bg-gray-100 py-3 pl-10 pr-3 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:border-yellow-500 focus:outline-none dark:border-[#2f2f2f] dark:bg-[#2a2a2a] dark:text-gray-200 dark:placeholder-gray-500"
									placeholder="Password"
									value={formData.password}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 rounded border border-gray-300 text-yellow-500 focus:border-yellow-500 focus:outline-none dark:border-[#2f2f2f]"
							/>
							<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
								Remember me
							</label>
						</div>
						<div className="text-sm">
							<a href="#" className="font-medium text-yellow-500 hover:text-yellow-400">
								Forgot your password?
							</a>
						</div>
					</div>

					{error && (
						<div className="rounded-lg bg-red-50 py-2 text-center text-sm text-red-500 dark:bg-red-900/20">
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="group relative flex w-full justify-center rounded-lg border border-transparent bg-[#2f2f2f] px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{loading ? (
							<Loader2 className="h-5 w-5 animate-spin" />
						) : (
							<span className="flex items-center">
								Sign in
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</span>
						)}
					</button>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300 dark:border-[#2f2f2f]"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-white px-2 text-gray-500 dark:bg-[#262626]">
									Or continue with
								</span>
							</div>
						</div>
						<div className="mt-6 flex w-full justify-center">
							<GoogleLogin
								onSuccess={handleGoogleSuccess}
								onError={() => {
									setError('Google login failed. Please try again.');
								}}
							/>
						</div>
					</div>
				</form>

				<div className="mt-6 text-center text-sm">
					<p className="text-gray-600 dark:text-gray-400">
						Don't have an account?{' '}
						<Link to="/register" className="font-medium text-yellow-500 transition-colors hover:text-yellow-400">
							Sign up for free
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;