'use client';

import { 
  ArrowsRightLeftIcon,
  BoltIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CalculatorIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function IPv4IPv6Guide() {
  const [selectedTab, setSelectedTab] = useState('comparison');
  const [quizAnswers, setQuizAnswers] = useState({});

  const comparisonData = {
    ipv4: {
      addressLength: "32-bit",
      addressExample: "192.168.1.1",
      totalAddresses: "4.3 billion",
      adoption: "~95%",
      speed: "Slightly faster",
      security: "Basic",
      nat: "Required",
      headerSize: "20 bytes"
    },
    ipv6: {
      addressLength: "128-bit",
      addressExample: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      totalAddresses: "340 undecillion",
      adoption: "~40%",
      speed: "Optimized",
      security: "Built-in IPSec",
      nat: "Not required",
      headerSize: "40 bytes"
    }
  };

  const quizQuestions = [
    {
      question: "Which IP version has more available addresses?",
      options: ["IPv4", "IPv6"],
      correct: "IPv6",
      explanation: "IPv6 has 340 undecillion addresses vs IPv4's 4.3 billion"
    },
    {
      question: "Which version has built-in security features?",
      options: ["IPv4", "IPv6"],
      correct: "IPv6",
      explanation: "IPv6 includes mandatory IPSec support for encryption"
    },
    {
      question: "Which is more widely adopted today?",
      options: ["IPv4", "IPv6"],
      correct: "IPv4",
      explanation: "IPv4 still powers about 95% of internet traffic"
    }
  ];

  const benefits = [
    {
      title: "Unlimited Addresses",
      description: "IPv6 provides enough addresses for every device",
      icon: <CalculatorIcon className="h-6 w-6" />
    },
    {
      title: "Better Performance",
      description: "Simplified packet headers and efficient routing",
      icon: <BoltIcon className="h-6 w-6" />
    },
    {
      title: "Enhanced Security",
      description: "Built-in encryption and authentication",
      icon: <ShieldCheckIcon className="h-6 w-6" />
    },
    {
      title: "No NAT Needed",
      description: "Eliminates network address translation complexity",
      icon: <ArrowsRightLeftIcon className="h-6 w-6" />
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-100">
        <div className="text-center mb-4">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ArrowsRightLeftIcon className="h-4 w-4 mr-2" />
            Educational Guide
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            IPv4 vs IPv6 Complete Guide
          </h3>
          <p className="text-gray-600 mt-2">
            Understand the differences, benefits, and future of internet protocols
          </p>
        </div>
        
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setSelectedTab('comparison')}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedTab === 'comparison'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Comparison
          </button>
          <button
            onClick={() => setSelectedTab('benefits')}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedTab === 'benefits'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Benefits
          </button>
          <button
            onClick={() => setSelectedTab('quiz')}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedTab === 'quiz'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Quick Quiz
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {selectedTab === 'comparison' ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* IPv4 Card */}
              <div className="border-2 border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg mr-4">
                      <ComputerDesktopIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">IPv4</h4>
                      <div className="text-sm text-gray-500">Established 1981</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-700">Legacy</div>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(comparisonData.ipv4).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0">
                      <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="font-medium text-gray-900">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IPv6 Card */}
              <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-4">
                      <DevicePhoneMobileIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">IPv6</h4>
                      <div className="text-sm text-gray-500">Introduced 1998</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-blue-600">Future</div>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(comparisonData.ipv6).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center pb-3 border-b border-blue-100 last:border-0">
                      <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="font-medium text-gray-900">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Differences */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Differences Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="p-2 bg-red-100 rounded-lg mr-3">
                    <XCircleIcon className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">IPv4 Limitations</div>
                    <div className="text-sm text-gray-600">Address exhaustion, NAT complexity, limited security</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">IPv6 Advantages</div>
                    <div className="text-sm text-gray-600">Massive address space, better security, auto-configuration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : selectedTab === 'benefits' ? (
          <div>
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Benefits of IPv6 Adoption</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
                    <div className="p-3 bg-blue-100 rounded-lg inline-block mb-4">
                      <div className="text-blue-600">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="font-semibold text-gray-900 mb-2">{benefit.title}</div>
                    <div className="text-sm text-gray-600">{benefit.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Migration Status */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Global IPv6 Adoption Status</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">Worldwide Adoption</div>
                    <div className="text-sm text-gray-900">~40%</div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-sm text-gray-600">Google Services</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">65%</div>
                    <div className="text-sm text-gray-600">Facebook Traffic</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">30%</div>
                    <div className="text-sm text-gray-600">Global Websites</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Quick IPv4 vs IPv6 Quiz</h4>
              <div className="space-y-6">
                {quizQuestions.map((q, index) => {
                  const userAnswer = quizAnswers[index];
                  const isCorrect = userAnswer === q.correct;
                  
                  return (
                    <div key={index} className="border border-gray-200 rounded-xl p-5">
                      <div className="font-medium text-gray-900 mb-4">
                        {index + 1}. {q.question}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        {q.options.map(option => (
                          <button
                            key={option}
                            onClick={() => setQuizAnswers({...quizAnswers, [index]: option})}
                            className={`w-full text-left px-4 py-3 rounded-lg border ${
                              userAnswer === option
                                ? isCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-red-500 bg-red-50'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      
                      {userAnswer && (
                        <div className={`p-3 rounded-lg ${
                          isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          <div className="font-medium">{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</div>
                          <div className="text-sm mt-1">{q.explanation}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Score Display */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Object.keys(quizAnswers).length === 0 ? '0' : 
                 Math.round((Object.values(quizAnswers).filter((ans, i) => ans === quizQuestions[i].correct).length / 
                 Object.keys(quizAnswers).length) * 100)}%
              </div>
              <div className="text-gray-600 mb-4">Your Quiz Score</div>
              <button
                onClick={() => setQuizAnswers({})}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Reset Quiz
              </button>
            </div>
          </div>
        )}

        {/* Final Takeaway */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-start">
            <GlobeAltIcon className="h-6 w-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">The Future is IPv6</h4>
              <p className="text-gray-600">
                While IPv4 continues to dominate today, IPv6 adoption is growing steadily. 
                The transition is inevitable as more devices connect to the internet. 
                Most modern systems support both protocols, ensuring a smooth transition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these missing icons
const XCircleIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);