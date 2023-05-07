import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FAQVector from "../../assets/FAQVector.svg";
import FAQCollapsible from "./FAQCollapsible";

const FAQ: React.FC = () => {
  const [clicked, setClicked] = useState<number | undefined>(0);

  const FAQQueries = [
    {
      question: "Where are you located?",
      answer:
        "We are currently located at Fort Bonifacio (Taguig); Post Proper Northside (Makati)",
    },
    {
      question: "What are the payment method available?",
      answer:
        "Major credit cards/debit cards via PayMongo and PayPal, and GCash and PayMaya for e-wallet payments.",
    },
    {
      question: "Do you ship internationally ? ",
      answer: "No, we currently do not offer international shipping.",
    },
    {
      question:
        "Are all product available online also available in you physical store?",
      answer:
        "No. Each store, including the online store has its own stocks so product availability may vary.",
    },
    {
      question: "How long will it take my order to arrive?",
      answer:
        "Orders within Metro Manila will arrive within 5-7 business days and 7-20 business days for provincial orders.",
    },
    {
      question: "How do I return a defective or faulty product?",
      answer:
        "If your item is potentially defective or faulty, and it's been less than 30 days since your Nike purchase, simply return the item. If it's been more than 30 days since your purchase, please call us to return the item.",
    },
  ];

  const handleToggle = (index: number) => {
    if (clicked === index) {
      return setClicked(undefined);
    }
    setClicked(index);
  };

  return (
    <div className="flex p-20">
      <div className="flex items-start justify-center w-[50%] ">
        <img src={FAQVector} alt="FAQ Vector" />
      </div>
      <div className="flex-1 px-5 ">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <div className="max-w-2xl mt-10 ">
          {FAQQueries.map((faq, index) => {
            return (
              <FAQCollapsible
                question={faq.question}
                answer={faq.answer}
                isActive={clicked === index}
                onToggle={() => handleToggle(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
