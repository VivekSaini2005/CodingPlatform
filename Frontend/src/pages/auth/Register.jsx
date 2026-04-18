import { useState } from 'react';
import { User, Mail, Lock, Loader2, ArrowRight, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
	const { register, googleLogin } = useAuth();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		age: '',
		emailId: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (formData.firstName.length < 3 || formData.firstName.length > 20) {
			setError('First name must be between 3 and 20 characters');
			setLoading(false);
			return;
		}

		if (formData.lastName && (formData.lastName.length < 3 || formData.lastName.length > 20)) {
			setError('Last name must be between 3 and 20 characters');
			setLoading(false);
			return;
		}

		try {
			await register(formData);
			navigate('/problems');
		} catch (err) {
			setError(err || 'Registration failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSuccess = async (credentialResponse) => {
		try {
			setLoading(true);
			setError(null);
			await googleLogin(credentialResponse.credential);
			navigate('/problems');
		} catch (err) {
			setError(err || 'Google signup failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#1a1a1a] text-black dark:text-white px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8 rounded-xl border border-gray-200 bg-white p-8 dark:border-[#2f2f2f] dark:bg-[#262626]">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
						Create an account
					</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Join our community of developers
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor="firstName" className="sr-only">First Name</label>
								<div className="relative">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<User className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="firstName"
										name="firstName"
										type="text"
										required
										className="block w-full rounded-lg border border-gray-300 bg-gray-100 py-3 pl-10 pr-3 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:border-yellow-500 focus:outline-none dark:border-[#2f2f2f] dark:bg-[#2a2a2a] dark:text-gray-200 dark:placeholder-gray-500"
										placeholder="First Name"
										value={formData.firstName}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div>
								<label htmlFor="lastName" className="sr-only">Last Name</label>
								<div className="relative">
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<User className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="lastName"
										name="lastName"
										type="text"
										className="block w-full rounded-lg border border-gray-300 bg-gray-100 py-3 pl-10 pr-3 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:border-yellow-500 focus:outline-none dark:border-[#2f2f2f] dark:bg-[#2a2a2a] dark:text-gray-200 dark:placeholder-gray-500"
										placeholder="Last Name"
										value={formData.lastName}
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>

						<div>
							<label htmlFor="age" className="sr-only">Age</label>
							<div className="relative">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<Calendar className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="age"
									name="age"
									type="number"
									min="5"
									max="80"
									className="block w-full rounded-lg border border-gray-300 bg-gray-100 py-3 pl-10 pr-3 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:border-yellow-500 focus:outline-none dark:border-[#2f2f2f] dark:bg-[#2a2a2a] dark:text-gray-200 dark:placeholder-gray-500"
									placeholder="Age (Optional)"
									value={formData.age}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div>
							<label htmlFor="emailId" className="sr-only">Email address</label>
							<div className="relative">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="emailId"
									name="emailId"
									type="email"
									required
									className="block w-full rounded-lg border border-gray-300 bg-gray-100 py-3 pl-10 pr-3 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:border-yellow-500 focus:outline-none dark:border-[#2f2f2f] dark:bg-[#2a2a2a] dark:text-gray-200 dark:placeholder-gray-500"
									placeholder="Email address"
									value={formData.emailId}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="sr-only">Password</label>
							<div className="relative">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type="password"
									required
									className="block w-full rounded-lg border border-gray-300 bg-gray-100 py-3 pl-10 pr-3 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:border-yellow-500 focus:outline-none dark:border-[#2f2f2f] dark:bg-[#2a2a2a] dark:text-gray-200 dark:placeholder-gray-500"
									placeholder="Password"
									value={formData.password}
									onChange={handleChange}
								/>
							</div>
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
								Create Account
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
									setError('Google signup failed. Please try again.');
								}}
							/>
						</div>
					</div>
				</form>

				<div className="mt-6 text-center text-sm">
					<p className="text-gray-600 dark:text-gray-400">
						Already have an account?{' '}
						<Link to="/login" className="font-medium text-yellow-500 transition-colors hover:text-yellow-400">
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;