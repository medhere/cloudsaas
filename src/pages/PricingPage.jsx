import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const PricingPage = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small projects and personal use',
      monthlyPrice: 9,
      annualPrice: 99,
      features: [
        '1 project',
        '2 environments',
        '1GB database storage',
        'Shared compute resources',
        'Community support',
        'Basic monitoring',
        'Manual scaling',
        'Daily backups'
      ],
      cta: 'Start for free',
      popular: false
    },
    {
      name: 'Professional',
      description: 'For growing teams and production applications',
      monthlyPrice: 29,
      annualPrice: 299,
      features: [
        '5 projects',
        'Unlimited environments',
        '10GB database storage',
        'Dedicated compute resources',
        'Priority support',
        'Advanced monitoring',
        'Auto-scaling',
        'Hourly backups',
        'Custom domains',
        'Team collaboration'
      ],
      cta: 'Start free trial',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For organizations with advanced needs',
      monthlyPrice: 99,
      annualPrice: 999,
      features: [
        'Unlimited projects',
        'Unlimited environments',
        '100GB database storage',
        'Dedicated compute resources',
        '24/7 phone support',
        'Advanced monitoring',
        'Auto-scaling',
        'Continuous backups',
        'Custom domains',
        'Team collaboration',
        'SSO integration',
        'SLA guarantees',
        'Dedicated account manager'
      ],
      cta: 'Contact sales',
      popular: false
    }
  ];

  return (
    <div className="bg-blue-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-yellow-400">Pricing</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pricing plans for teams of all sizes
          </p>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="mt-10 flex justify-center">
          <div className="relative flex rounded-full bg-blue-800 p-1">
            <button
              type="button"
              className={`${
                annual ? 'bg-yellow-500 text-blue-900 shadow-sm' : 'bg-transparent text-blue-100'
              } relative rounded-full py-2 px-6 text-sm font-medium focus:outline-none`}
              onClick={() => setAnnual(true)}
            >
              Annual
              {annual && <span>(Save 15%)</span>}
            </button>
            <button
              type="button"
              className={`${
                !annual ? 'bg-yellow-500 text-blue-900 shadow-sm' : 'bg-transparent text-blue-100'
              } relative rounded-full py-2 px-6 text-sm font-medium focus:outline-none`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
          </div>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-3xl ${
                plan.popular
                  ? 'ring-2 ring-yellow-400 bg-white shadow-xl'
                  : 'ring-1 ring-blue-700 bg-blue-800/40 shadow'
              } p-8`}
            >
              {plan.popular && (
                <div className="mb-4">
                  <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold leading-5 text-blue-900">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className={`text-xl font-semibold ${plan.popular ? 'text-blue-900' : 'text-white'}`}>{plan.name}</h3>
                <p className={`mt-2 text-sm ${plan.popular ? 'text-gray-500' : 'text-blue-200'}`}>{plan.description}</p>
                <p className="mt-6">
                  <span className={`text-4xl font-bold tracking-tight ${plan.popular ? 'text-blue-900' : 'text-white'}`}>
                    ${annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={`text-sm font-semibold ${plan.popular ? 'text-gray-500' : 'text-blue-200'}`}>
                    {annual ? '/year' : '/month'}
                  </span>
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className={`h-5 w-5 ${plan.popular ? 'text-blue-800' : 'text-yellow-400'}`} />
                      </div>
                      <p className={`ml-3 text-sm ${plan.popular ? 'text-gray-500' : 'text-blue-200'}`}>{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  to={plan.name === 'Enterprise' ? '#' : '/auth'}
                  className={`block w-full rounded-md px-4 py-2 text-center text-sm font-semibold shadow-sm ${
                    plan.popular
                      ? 'bg-blue-800 text-white hover:bg-blue-700'
                      : 'bg-yellow-500 text-blue-900 hover:bg-yellow-400'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <h2 className="text-xl font-semibold text-white">
            Need a custom solution?
          </h2>
          <p className="mt-2 text-blue-100">
            Contact our sales team to discuss your specific requirements.
          </p>
          <div className="mt-6">
            <Link
              to="#"
              className="text-yellow-400 font-medium hover:text-yellow-300"
            >
              Contact Sales <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
