import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../../../api/axiosInstance";
import { Send } from "lucide-react";

const useTypewriter = (text, speed = 30) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText("");

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isTyping };
};

const TypewriterMessage = ({ text, isLastMessage }) => {
  const { displayedText, isTyping } = useTypewriter(text, 25);

  return (
    <div className="max-w-[80%] bg-gradient-to-br from-base-200 to-base-300 text-base-content px-4 py-3 rounded-2xl shadow-md animate-messageSlideIn">
      <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
        {displayedText}
        {isTyping && isLastMessage && (
          <span className="inline-block w-[2px] h-4 bg-base-content ml-1 animate-pulse"></span>
        )}
      </div>
    </div>
  );
};

function ChatAi({ problem }) {
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [
        {
          text: "Hi! I'm here to help you with this problem. Feel free to ask me anything about the solution or approach."
        }
      ]
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {

    setIsLoading(true);

    const newMessage = { role: "user", parts: [{ text: data.message }] };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    reset();

    try {

      const response = await axiosClient.post("/ai/chat", {
        messages: updatedMessages,
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.startCode
      });

      setMessages(prev => [
        ...prev,
        {
          role: "model",
          parts: [{ text: response.data.message }]
        }
      ]);

    } catch (error) {

      console.error("API Error:", error.message);

      setMessages(prev => [
        ...prev,
        {
          role: "model",
          parts: [{ text: "Sorry, I encountered an error: " + error.message }]
        }
      ]);

    } finally {

      setIsLoading(false);

    }
  };

  return (
    <div className="flex flex-col h-full max-h-[70vh] min-h-[420px] rounded-2xl bg-base-100/60 backdrop-blur-lg border border-base-300 shadow-xl overflow-hidden">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-base-300">

        {messages.map((msg, index) => {

          const isLastMessage = index === messages.length - 1;
          const isLastAIMessage = isLastMessage && msg.role === "model";

          return (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
            >

              {msg.role === "user" ? (

                <div className="max-w-[75%] bg-gradient-to-r from-primary to-secondary text-primary-content px-4 py-3 rounded-2xl shadow-lg text-sm md:text-base">
                  {msg.parts[0].text}
                </div>

              ) : (

                <TypewriterMessage
                  text={msg.parts[0].text}
                  isLastMessage={isLastAIMessage}
                />

              )}

            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-base-200 px-4 py-3 rounded-xl shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-base-content rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-base-content rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-base-content rounded-full animate-bounce delay-300"></div>
              <span className="text-sm opacity-70 ml-2">AI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sticky bottom-0 bg-base-100/70 backdrop-blur-md border-t border-base-300 p-4"
        >
        <div className="flex items-center gap-3 max-w-4xl mx-auto">

            <input
            placeholder="Ask anything about this problem..."
            className="flex-1 bg-base-200 border border-base-300 rounded-full px-5 py-3 text-sm md:text-base
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-all duration-200 shadow-sm"
            {...register("message", { required: true, minLength: 2 })}
            disabled={isLoading}
            />

            <button
            type="submit"
            className={`flex items-center justify-center w-12 h-12 rounded-full
            bg-gradient-to-r from-primary to-secondary text-white
            shadow-md hover:scale-105 hover:shadow-lg
            transition-all duration-200
            ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={errors.message || isLoading}
            >
            {!isLoading ? <Send size={20} /> : (
                <span className="loading loading-spinner loading-sm"></span>
            )}
            </button>

        </div>
        </form>

    </div>
  );
}

export default ChatAi;
