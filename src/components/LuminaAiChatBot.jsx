import React, { useContext, useState } from "react";
import { quizDataContext } from "../ContextApi";

const LuminaAiChatBot = () => {
    const [inputField, setInputField] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setloading] = useState(false);

    const cancelAiBot = () => {}
    const handleResponse = async (e) => {
        e.preventDefault();
        if (!inputField.trim()) return;

        const newMessage = [...messages, { role: "user", content: inputField }];
        setMessages(newMessage);
        setInputField("");
        setloading(true);

        try {
            const res = await fetch("http://localhost:5002/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: inputField }),
            });

            if (!res.body) {
                throw new Error("No response body");
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let botReply = "";
            setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const parts = chunk.split("\n\n");

                for (const part of parts) {
                    if (part.startsWith("data: ")) {
                        const data = part.replace("data: ", "").trim();

                        if (data === "[DONE]") continue;
                        try {
                            const parsed = JSON.parse(data);
                            const token = parsed.token || "";

                            botReply += token;

                            setMessages((prev) => {
                                const updated = [...prev];
                                updated[updated.length - 1].content = botReply;
                                return updated;
                            });
                        } catch (error) {
                            console.error("Parse error:", err, data);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Server Error..." },
            ]);
        } finally {
            setloading(false);
        }
    };

    return (
        <>
            <div className="min-w-[280px] w-[380px] max-w-[450px] overflow-hidden bg-neutral-200 rounded-xl">
                <div className="heading py-4 border-b border-neutral-200">
                    <header className="flex justify-between items-center  px-4">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text ">LuminaAi</h1>
                        <button onClick={cancelAiBot} className="cursor-pointer hover:scale-105 transition-all duration-150 px-2 py-1">❌</button>
                    </header>
                </div>
                <div className="messageContent w-full overflow-y-auto h-[300px] bg-neutral-300 px-2">
                    {messages.map((mssg, idx) => (
                        <div
                            key={idx}
                            className={`my-3.5 rounded-lg px-3 py-2 max-w-[75%] break-words ${mssg.role === "user"
                                ? "bg-gray-600 text-gray-200 self-end ml-auto"
                                : "bg-gray-700 text-gray-200 text-left"
                                }`}
                        >
                            <pre className="whitespace-pre-wrap">{mssg.content}</pre>
                        </div>
                    ))}

                    {loading && <p className="text-gray-400">Thinking...</p>}
                </div>
                <div className="inputForm w-full flex justify-between items-center">
                    <form
                        onSubmit={handleResponse}
                        className="w-full py-7 px-2 flex gap-2.5 items-center"
                    >
                        <input
                            value={inputField}
                            onChange={(e) => setInputField(e.target.value)}
                            className="border border-gray-400 w-[500px] px-3 py-2 rounded-lg text-gray-200 placeholder:text-gray-100 bg-gray-500"
                            type="text"
                            placeholder="Ask Me Anything..."
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-3 py-2 cursor-pointer flex justify-center items-center rounded-xl bg-gradient-to-bl from-purple-800 via-blue-500 to-purple-500 text-md text-gray-200 font-semibold disabled:opacity-50"
                        >
                            {loading ? "..." : "Search"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LuminaAiChatBot;
