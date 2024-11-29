import React from 'react';
import { X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Course } from '../../types';
import { useAuth } from '../../lib/auth';
import { formatDate } from '../../lib/utils';
import { Button } from '../ui/Button';

interface CertificateModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const userName = user?.name || 'Dr. John Doe';

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Set background color
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 297, 210, 'F');

    // Add border
    doc.setDrawColor(65, 91, 238);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Add title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    doc.setTextColor(33, 33, 33);
    doc.text('CERTIFICATE', 148.5, 50, { align: 'center' });
    doc.text('OF COMPLETION', 148.5, 65, { align: 'center' });

    // Add content
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('THIS CERTIFICATE IS PRESENTED TO', 148.5, 90, { align: 'center' });

    // Add name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(userName, 148.5, 105, { align: 'center' });

    // Add course details
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('For successfully completing:', 148.5, 125, { align: 'center' });
    
    doc.setFont('helvetica', 'bold');
    doc.text(course.title, 148.5, 135, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text([
      `Provider: ${course.provider}`,
      `Credits: ${course.credits} AMA PRA Category 1`,
      `Date: ${formatDate(new Date(course.startDate))} through ${formatDate(new Date(course.endDate))}`,
      `Location: ${course.location}`,
    ], 148.5, 150, { align: 'center', lineHeightFactor: 1.5 });

    // Add signature line
    doc.line(98.5, 185, 198.5, 185);
    doc.setFontSize(10);
    doc.text('Medical Director', 148.5, 190, { align: 'center' });

    // Save the PDF
    doc.save(`${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_certificate.pdf`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-4xl rounded-lg bg-white p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{course.title} - Certificate</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="aspect-[1.414] w-full border-2 border-blue-600 p-8">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl font-bold mb-2">CERTIFICATE</h1>
            <h2 className="text-4xl font-bold mb-8">OF COMPLETION</h2>
            
            <p className="text-lg mb-4">THIS CERTIFICATE IS PRESENTED TO</p>
            <p className="text-3xl font-bold mb-8">{userName}</p>
            
            <p className="text-lg mb-2">For successfully completing:</p>
            <p className="text-2xl font-bold mb-6">{course.title}</p>
            
            <div className="space-y-2 text-lg">
              <p>Provider: {course.provider}</p>
              <p>Credits: {course.credits} AMA PRA Category 1</p>
              <p>Date: {formatDate(new Date(course.startDate))} through {formatDate(new Date(course.endDate))}</p>
              <p>Location: {course.location}</p>
            </div>

            <div className="mt-auto">
              <div className="w-48 h-px bg-gray-400 mb-2 mx-auto" />
              <p className="text-sm">Medical Director</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={generatePDF} className="flex items-center">
            Download Certificate
          </Button>
        </div>
      </div>
    </div>
  );
};