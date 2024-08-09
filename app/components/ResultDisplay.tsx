import React from 'react';
import { Separator } from "@/components/ui/separator"

interface ResultDisplayProps {
  result: any;
  formatResult: (portion: string) => string;
  amount: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, formatResult, amount }) => {
  const calculateDollarValue = (portion: number) => {
    return (amount * portion).toFixed(2);
  };

  const formatPercentage = (portion: number) => {
    return (portion * 100).toFixed(2) + '%';
  };

  const formatFraction = (portion: number) => {
    const fractionValue = Math.round(portion * 24);
    return `${fractionValue}/24`;
  };

  return (
    <div className="p-4 bg-white rounded">
      {result.Father_Portion > 0 && (
        <div className="mb-6 border-b pb-2">
          <strong className="text-lg font-semibold">👨‍👦 Father:</strong>
          <div className="text-gray-700">${calculateDollarValue(result.Father_Portion)} - ({formatPercentage(result.Father_Portion)}) - ({formatFraction(result.Father_Portion)})</div>
        </div>
      )}
      {result.Mother_Portion > 0 && (
        <div className="mb-6 border-b pb-2">
          <strong className="text-lg font-semibold">👩‍👧 Mother:</strong>
          <div className="text-gray-700">${calculateDollarValue(result.Mother_Portion)} - ({formatPercentage(result.Mother_Portion)}) - ({formatFraction(result.Mother_Portion)})</div>
        </div>
      )}
      {result.Spouse_Portion > 0 && (
        <div className="mb-6 border-b pb-2">
          <strong className="text-lg font-semibold">💍 Spouse:</strong>
          <div className="text-gray-700">${calculateDollarValue(result.Spouse_Portion)} - ({formatPercentage(result.Spouse_Portion)}) - ({formatFraction(result.Spouse_Portion)})</div>
        </div>
      )}
      {result.Children_Portion > 0 && (
        <div className="mb-6 border-b pb-2">
          <strong className="text-lg font-semibold">👶 Children:</strong>
          <div className="text-gray-700">${calculateDollarValue(result.Children_Portion)} - ({formatPercentage(result.Children_Portion)}) - ({formatFraction(result.Children_Portion)})</div>
        </div>
      )}

      {/* List all Sons */}
      {result.Children_Shares && Object.keys(result.Children_Shares).filter(key => key.startsWith('Son_')).length > 0 && (
        <div className="mb-6 border-b pb-2">
          <strong className="text-lg font-semibold">👦 Sons:</strong>
          <ul className="list-disc pl-5">
            {Object.keys(result.Children_Shares).filter(key => key.startsWith('Son_')).map(sonKey => (
              <li key={sonKey} className="text-gray-700">
                {sonKey}: ${calculateDollarValue(result.Children_Shares[sonKey])} - ({formatPercentage(result.Children_Shares[sonKey])}) - ({formatFraction(result.Children_Shares[sonKey])})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* List all Daughters */}
      {result.Children_Shares && Object.keys(result.Children_Shares).filter(key => key.startsWith('Daughter_')).length > 0 && (
        <div className="mb-6 border-b pb-2">
          <strong className="text-lg font-semibold">👧 Daughters:</strong>
          <ul className="list-disc pl-5">
            {Object.keys(result.Children_Shares).filter(key => key.startsWith('Daughter_')).map(daughterKey => (
              <li key={daughterKey} className="text-gray-700">
                {daughterKey}: ${calculateDollarValue(result.Children_Shares[daughterKey])} - ({formatPercentage(result.Children_Shares[daughterKey])}) - ({formatFraction(result.Children_Shares[daughterKey])})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* List all Brothers */}
      {result.Siblings_Shares && Object.keys(result.Siblings_Shares).filter(key => key.startsWith('Brother_')).length > 0 && (
        <div className="mb-6 border-b pb-2">
          <strong className="text-lg font-semibold">👨‍ Brother:</strong>
          <ul className="list-disc pl-5">
            {Object.keys(result.Siblings_Shares).filter(key => key.startsWith('Brother_')).map(brotherKey => (
              <li key={brotherKey} className="text-gray-700">
                {brotherKey}: ${calculateDollarValue(result.Siblings_Shares[brotherKey])} - ({formatPercentage(result.Siblings_Shares[brotherKey])}) - ({formatFraction(result.Siblings_Shares[brotherKey])})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* List all Sisters */}
      {result.Siblings_Shares && Object.keys(result.Siblings_Shares).filter(key => key.startsWith('Sister_')).length > 0 && (
        <div className="mb-6 border-b pb-2">
          <strong className="text-lg font-semibold">👧 Sisters:</strong>
          <ul className="list-disc pl-5">
            {Object.keys(result.Siblings_Shares).filter(key => key.startsWith('Sister_')).map(sisterKey => (
              <li key={sisterKey} className="text-gray-700">
                {sisterKey}: ${calculateDollarValue(result.Siblings_Shares[sisterKey])} - ({formatPercentage(result.Siblings_Shares[sisterKey])}) - ({formatFraction(result.Siblings_Shares[sisterKey])})
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.Siblings_Portion > 0 && (
        <div className="mb-6 border-b pb-2">
          <strong className="text-lg font-semibold">👫 Siblings:</strong>
          <div className="text-gray-700">${calculateDollarValue(result.Siblings_Portion)} - ({formatPercentage(result.Siblings_Portion)}) - ({formatFraction(result.Siblings_Portion)})</div>
        </div>
      )}
      {result.Charity_Portion > 0 && (
        <div className="mb-6 border-b pb-2">
          <strong className="text-lg font-semibold text-red-700">🎗 Charity:</strong>
          <div className="text-red-700">${calculateDollarValue(result.Charity_Portion)} - ({formatPercentage(result.Charity_Portion)}) - ({formatFraction(result.Charity_Portion)})</div>
        </div>
      )}
      <div className="mb-6">
        <strong className="text-lg font-semibold">Total:</strong>
        <div>${calculateDollarValue(result.total)} - ({formatPercentage(result.total)})</div>
      </div>
    </div>
  );
};

export default ResultDisplay;
