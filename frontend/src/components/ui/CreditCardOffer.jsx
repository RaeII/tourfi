import React from 'react';
import { Button } from './button';
import { 
  CreditCard,
  Star,
  Globe,
  Percent,
  Gift,
  TrendingUp,
  Wallet,
  Shield,
  Receipt,
  Plane,
  Coins
} from 'lucide-react';

const CreditCardOffer = ({ onRequestCard, onDismiss, className = "" }) => {
  const benefits = [
    {
      icon: Percent,
      title: "Zero IOF & Foreign Fees",
      description: "Save up to 6.38% on international transactions"
    },
    {
      icon: TrendingUp,
      title: "10% Crypto Cashback",
      description: "Double your rewards on travel purchases"
    },
    {
      icon: Globe,
      title: "Global Acceptance",
      description: "Use anywhere Visa is accepted worldwide"
    },
    {
      icon: Shield,
      title: "Travel Insurance",
      description: "Comprehensive coverage included with your card"
    },
    {
      icon: Wallet,
      title: "Crypto Integration",
      description: "Seamlessly spend your crypto anywhere"
    },
    {
      icon: Star,
      title: "Premium Benefits",
      description: "Airport lounges and travel perks worldwide"
    }
  ];

  return (
    <div className={`bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 rounded-lg shadow-xl p-8 text-white animate-fadeIn ${className}`}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">
          The Ultimate Travel Card!
        </h3>
        <p className="text-yellow-100 dark:text-blue-100">
          Get the Tourfi Travel Card and revolutionize your international spending
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div key={index} className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <IconComponent className="w-5 h-5 mr-2" />
                <span className="font-semibold">{benefit.title}</span>
              </div>
              <p className="text-sm text-yellow-100 dark:text-blue-100">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-white/10 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center mb-2">
          <Gift className="w-5 h-5 mr-2" />
          <span className="font-semibold">Limited Time Offer</span>
        </div>
        <p className="text-center text-sm text-yellow-100 dark:text-blue-100">
          Apply now and get your first year free + $100 travel credit
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onRequestCard}
          className="flex-1 bg-white text-yellow-600 dark:text-blue-600 hover:bg-gray-100 font-semibold py-3"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Request Your Card
        </Button>
        <Button 
          onClick={onDismiss}
          variant="outline"
          className="flex-1 border-white/30 text-white hover:bg-white/10 py-3"
        >
          Maybe Later
        </Button>
      </div>

      <p className="text-xs text-yellow-100 dark:text-blue-100 text-center mt-4">
        Subject to credit approval. Terms and conditions apply.
      </p>
    </div>
  );
};

export default CreditCardOffer; 