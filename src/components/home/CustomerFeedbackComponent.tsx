'use client';

import { useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon, Check } from 'lucide-react';
import { Icons } from '../utils/Icons';
import { Button } from '../ui/button';

export const CustomerFeedbackComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const feedbacksPerPage = 3;

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const feedbacks = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      review:
        'I absolutely love this store! The quality of the clothes is outstanding. Every piece I have bought has lasted and stayed in great condition. The customer service is also excellent. The staff is always friendly and helpful. I love shopping here and I will continue to do so in the future.',
    },
    {
      id: 2,
      name: 'John D.',
      rating: 4,
      review:
        'This store has a great selection of styles and sizes. I was able to find exactly what I was looking for. The clothes are stylish and comfortable. I was also impressed with the customer service. The staff was very helpful and knowledgeable. I will definitely be back.',
    },
    {
      id: 3,
      name: 'Jane D.',
      rating: 3,
      review:
        "The clothes are decent, but the store could use more variety. I found a lot of the styles to be a bit too similar. However, it's a good place for basics and the prices are reasonable. The staff was friendly and helpful, which made the shopping experience better.",
    },
    {
      id: 4,
      name: 'Mike B.',
      rating: 5,
      review:
        'I recently bought a pair of jeans from this store and I am very happy with my purchase. The jeans fit perfectly and are very comfortable. The quality is also very good for the price. I was impressed with the customer service as well. The staff was very helpful and made sure I found what I was looking for.',
    },
    {
      id: 5,
      name: 'Emma S.',
      rating: 4,
      review:
        'I love the unique styles this store offers. The clothes are high-quality and well-made. I have received many compliments on the items I have bought from here. The customer service is also great. The staff is always willing to help and provide recommendations.',
    },
    {
      id: 6,
      name: 'Oliver T.',
      rating: 5,
      review:
        'This is my go-to store for clothing. The quality of the clothes is excellent and they have a great selection of styles. The staff is always friendly and helpful. I have never had a bad experience shopping here.',
    },
    {
      id: 7,
      name: 'Sophia L.',
      rating: 4,
      review:
        'I always find what I need at this store. The clothes are stylish and the quality is good for the price. The staff is also very helpful. They are always willing to assist you and answer any questions you may have.',
    },
    {
      id: 8,
      name: 'Noah P.',
      rating: 3,
      review:
        'The store is well-organized and the clothes are decent. However, I would like to see more variety in their styles. The customer service is good and the staff is friendly.',
    },
  ];

  const displayedFeedbacks = feedbacks.slice(
    currentPage * feedbacksPerPage,
    (currentPage + 1) * feedbacksPerPage
  );

  const previousFeedback = feedbacks[(currentPage - 1) * feedbacksPerPage];

  const nextFeedback = feedbacks[(currentPage + 1) * feedbacksPerPage];

  return (
    <div className="space-y-10">
      <div className="container flex justify-between items-end">
        <h1 className="bold-integral font-bold lg:text-5xl text-3xl">
          OUR HAPPY CUSTOMERS
        </h1>

        <div className="space-x-4">
          <Button variant={'outline'} className="w-12 p-0" onClick={handlePrev}>
            <ArrowLeftIcon />
          </Button>
          <Button variant={'outline'} className="w-12 p-0" onClick={handleNext}>
            <ArrowRightIcon />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="container grid grid-cols-3 gap-6 relative">
          {previousFeedback && (
            <div className="bg-white rounded-[23px] p-6 space-y-4 border absolute w-[480px] min-h-[295px] left-[-480px] blur-[3px]">
              <div className="flex items-center gap-2">
                {Array.from({ length: previousFeedback.rating }, (_, i) => (
                  <Icons.star key={i} className="lg:w-max w-4" />
                ))}
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-lg font-bold">{previousFeedback.name}</p>
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <Check stroke="white" className="w-3.5 h-3.5" />
                </div>
              </div>

              <p className="text-lg">{previousFeedback.review}</p>
            </div>
          )}

          {displayedFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white rounded-[23px] p-6 space-y-4 border min-h-[295px]"
            >
              <div className="flex items-center gap-2">
                {Array.from({ length: feedback.rating }, (_, i) => (
                  <Icons.star key={i} className="lg:w-max w-4" />
                ))}
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-lg font-bold">{feedback.name}</p>
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <Check stroke="white" className="w-3.5 h-3.5" />
                </div>
              </div>

              <p className="text-lg">{feedback.review}</p>
            </div>
          ))}

          {nextFeedback && (
            <div className="bg-white rounded-[23px] p-6 space-y-4 border absolute w-[480px] min-h-[295px] right-[-480px] blur-[3px]">
              <div className="flex items-center gap-2">
                {Array.from({ length: nextFeedback.rating }, (_, i) => (
                  <Icons.star key={i} className="lg:w-max w-4" />
                ))}
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-lg font-bold">{nextFeedback.name}</p>
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <Check stroke="white" className="w-3.5 h-3.5" />
                </div>
              </div>

              <p className="text-lg">{nextFeedback.review}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
