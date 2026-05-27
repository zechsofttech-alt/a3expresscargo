"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaComments,
  FaPaperPlane,
  FaTimes,
  FaRobot,
  FaUser,
  FaWhatsapp,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";

const ShiprocketChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stage, setStage] = useState("info-collection");
  const [currentStep, setCurrentStep] = useState(0);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const messagesEndRef = useRef(null);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    productType: "",
    productName: "",
    price: "",
    deliveryDate: "",
    message: "",
  });

  const [messages, setMessages] = useState([
    {
      text: "👋 Welcome to A3 Cargo To get started, please enter your name:",
      sender: "bot",
    },
  ]);

  const questions = [
    {
      field: "email",
      question: "Please enter your email address:",
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: "Please enter a valid email address",
    },
    {
      field: "country",
      question: "What's your country?",
      validation: (value) => value.length >= 2,
      errorMessage: "Please enter a valid country",
    },
    {
      field: "product",
      question: "What product are you looking for?",
      validation: (value) => value.length >= 2,
      errorMessage: "Please enter a valid product name",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setShowCloseIcon(false);
  };

  const handleMouseEnter = () => {
    if (!isChatOpen) {
      setShowCloseIcon(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isChatOpen) {
      setShowCloseIcon(false);
    }
  };

  const addBotMessage = (text, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { text, sender: "bot" }]);
    }, delay);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInputMessage("");

    if (stage === "info-collection") {
      const currentQuestion = questions[currentStep];

      if (!currentQuestion.validation(userMessage)) {
        addBotMessage(currentQuestion.errorMessage);
        return;
      }

      setUserInfo((prev) => ({
        ...prev,
        [currentQuestion.field]: userMessage,
      }));

      if (currentStep < questions.length - 1) {
        setCurrentStep((prev) => prev + 1);
        addBotMessage(questions[currentStep + 1].question);
      } else {
        setStage("message");
        addBotMessage("Please provide any additional message or requirements:");
      }
    } else if (stage === "message") {
      setUserInfo((prev) => ({
        ...prev,
        message: userMessage,
      }));
      setStage("summary");
      setShowContactOptions(true);

      const summaryMessage = `Thank you for providing your details! Here's a summary:

Email: ${userInfo.email}
City: ${userInfo.country}
Phone: ${userInfo.product}
Additional Message: ${userMessage}

Please choose how you would like to proceed by clicking one of the options below:`;

      addBotMessage(summaryMessage);
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = "+918825430312";
    const message = `Hi, I'm interested in placing an order:
Email: ${userInfo.email}
City: ${userInfo.country}
Phone: ${userInfo.product}
  Additional Message: ${userInfo.message}`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const WhatsAppButton = () => {
    const phoneNumber = "+918825430312";
    const message = `Hi, I am `;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const sendEmail = () => {
    const subject = `New Product Inquiry from ${userInfo.name}`;
    const body = `Product Inquiry Details:
    
Name: ${userInfo.name}
Email: ${userInfo.email}
Phone: ${userInfo.phone}
City: ${userInfo.city}
Product Type: ${userInfo.productType}
Product Name: ${userInfo.productName}
Budget: ₹${userInfo.price}
Delivery Date: ${userInfo.deliveryDate}
Additional Message: ${userInfo.message}`;

    window.location.href = `mailto:a3expresscargo@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="font-sans">
      {isChatOpen && (
        <div
          className={`fixed bg-white shadow-2xl flex flex-col transition-all duration-300 z-50 ${
            isMobile
              ? "inset-0"
              : "bottom-24 right-8 w-96 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 h-[600px]"
          }`}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center space-x-3">
              {isMobile && (
                <button
                  onClick={toggleChat}
                  className="p-2 hover:bg-blue-500 rounded-full transition-colors"
                >
                  <FaArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <FaRobot className="text-blue-600 text-xl" />
              </div>
              <div>
                <h2 className="font-bold text-lg">A3 Cargo</h2>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-xs text-blue-100">
                    Online | Ready to help
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-blue-500 p-2 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end space-x-2 ${
                  msg.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaRobot className="text-blue-600 text-sm" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[75%] whitespace-pre-wrap ${
                    msg.sender === "bot"
                      ? "bg-white text-gray-800 shadow-sm rounded-bl-none"
                      : "bg-blue-600 text-white shadow-sm rounded-br-none"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaRobot className="text-blue-600 text-sm" />
                </div>
                <div className="bg-gray-200 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Contact Options */}
          {showContactOptions && stage === "summary" && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={openWhatsApp}
                  className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={sendEmail}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FaEnvelope className="w-5 h-5" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex items-center space-x-2 p-4 bg-white border-t border-gray-200">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow bg-gray-100 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={WhatsAppButton}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="w-4 h-4" />
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              <FaPaperPlane className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Toggle Button with Close Icon */}
      {!isChatOpen && (
        <div
          className="fixed bottom-6 right-6 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={toggleChat}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all transform hover:scale-110 relative"
          >
            <FaComments className="w-6 h-6" />
            {showCloseIcon && (
              <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-lg transform scale-75 hover:scale-100 transition-transform">
                <FaTimes className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShiprocketChatbot;
