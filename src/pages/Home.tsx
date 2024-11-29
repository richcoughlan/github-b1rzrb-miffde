import React from 'react';
import { ArrowRight, Award, Calendar, FileCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Manage Your CME While on Vacation
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Concierge CME helps doctors complete their continuing medical education requirements
          while enjoying their time off. Track, verify, and certify your CME credits all in one place.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <Calendar className="h-12 w-12 text-blue-600" />
          <h3 className="mt-4 text-lg font-semibold">Vacation Planning</h3>
          <p className="mt-2 text-gray-600">
            Schedule your CME activities around your vacation dates for maximum efficiency.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <FileCheck className="h-12 w-12 text-blue-600" />
          <h3 className="mt-4 text-lg font-semibold">Easy Verification</h3>
          <p className="mt-2 text-gray-600">
            Upload and verify your CME completion documents with just a few clicks.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <Award className="h-12 w-12 text-blue-600" />
          <h3 className="mt-4 text-lg font-semibold">Instant Certificates</h3>
          <p className="mt-2 text-gray-600">
            Generate verified completion certificates for your records and tax purposes.
          </p>
        </div>
      </section>
    </div>
  );
};