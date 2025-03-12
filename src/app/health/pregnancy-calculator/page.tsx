import React from 'react';
import PregnancyCalculator from '@/components/PregnancyCalculator';
import { getCalculatorById } from '@/data/calculators';

export const metadata = {
  title: 'Pregnancy Calculator | Due Date and Milestone Calculator',
  description: 'Calculate your due date, pregnancy milestones, and trimester dates with our easy-to-use pregnancy calculator. Track your pregnancy journey week by week.',
};

export default async function PregnancyCalculatorPage() {
  const calculator = await getCalculatorById('pregnancy-calculator');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PregnancyCalculator calculator={calculator} />
      
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Pregnancy Calculator</h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">How is Due Date Calculated?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The due date, also known as the estimated date of delivery (EDD), is typically calculated using Naegele's rule. This method adds 280 days (40 weeks) to the first day of your last menstrual period (LMP). It assumes a 28-day menstrual cycle with ovulation occurring on day 14.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If your cycle is longer or shorter than 28 days, your due date may need adjustment. Similarly, if you know your conception date or have had an ultrasound dating scan, these can provide more accurate estimates.
          </p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Pregnancy Trimesters</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Pregnancy is typically divided into three trimesters, each lasting approximately 13-14 weeks:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Trimester</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Weeks</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Key Developments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">First Trimester</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">1-13</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Conception, implantation, and early organ development. Common symptoms include morning sickness, fatigue, and breast tenderness.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Second Trimester</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">14-27</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Baby's movements become noticeable, organs continue to develop, and gender can usually be determined. Many women experience reduced nausea and increased energy.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Third Trimester</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">28-40+</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    Rapid baby growth, lung maturation, and preparation for birth. Common symptoms include back pain, difficulty sleeping, and Braxton Hicks contractions.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Important Pregnancy Milestones</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Week</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700">Milestone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">8-10</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">First prenatal appointment and ultrasound</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">11-13</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Nuchal translucency screening</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">16-20</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Anatomy scan ultrasound (gender can often be determined)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">24-28</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Glucose screening test for gestational diabetes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">28</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Rhogam shot (if Rh negative)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">35-37</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Group B streptococcus (GBS) screening</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">37</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Baby is considered full term</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">40</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Due date</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">42</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Post-term pregnancy (medical intervention may be recommended)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Pregnancy Due Date Accuracy</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            It's important to remember that a due date is just an estimate. Only about 5% of babies are born exactly on their due date. Most babies are born within a two-week window of the due date (between 38 and 42 weeks). Several factors can affect the accuracy of your due date calculation:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Irregular Menstrual Cycles:</strong> If your cycles are consistently longer or shorter than 28 days, your ovulation may not occur on day 14.</li>
            <li><strong>Uncertain LMP:</strong> If you're unsure about the date of your last period, the calculation may be off.</li>
            <li><strong>First Pregnancy:</strong> First-time mothers often deliver later than their due date.</li>
            <li><strong>Previous Pregnancies:</strong> If you've had babies before, you might deliver earlier.</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Prenatal Care Recommendations</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Regular prenatal care is essential for a healthy pregnancy. Here's a general schedule of prenatal visits:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
            <li><strong>Weeks 4-28:</strong> One visit every 4 weeks</li>
            <li><strong>Weeks 28-36:</strong> One visit every 2 weeks</li>
            <li><strong>Weeks 36-birth:</strong> One visit every week</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your healthcare provider may recommend a different schedule based on your individual needs and risk factors.
          </p>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Category</h3>
          <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
            Health & Fitness
          </span>
        </div>
      </div>
    </div>
  );
} 