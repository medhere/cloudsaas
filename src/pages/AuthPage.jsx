import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Gitlab } from 'lucide-react';

const AuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-blue-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-yellow-500 rounded-md flex items-center justify-center text-blue-900 font-bold text-2xl">
            C
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to CloudSaaS
        </h2>
        <p className="mt-2 text-center text-sm text-blue-100">
          Access your dashboard, projects, and team
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
              >
                <Github className="h-5 w-5 mr-2" />
                Sign in with GitHub
              </button>
            </div>

            <div>
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
              >
                <Gitlab className="h-5 w-5 mr-2" />
                Sign in with GitLab
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    New to CloudSaaS?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-center text-sm text-gray-600">
                  By signing in, you agree to our{' '}
                  <Link to="#" className="font-medium text-blue-800 hover:text-blue-700">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="font-medium text-blue-800 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
