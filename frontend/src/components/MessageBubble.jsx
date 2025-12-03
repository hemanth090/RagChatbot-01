import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './MessageBubble.css';

const MessageBubble = ({ message, role, sources = [] }) => {
    const [showSources, setShowSources] = useState(false);
    const isUser = role === 'user';

    return (
        <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
            <div className="message-content">
                <div className="message-header">
                    <span className="message-role">{isUser ? 'You' : 'Assistant'}</span>
                </div>
                <div className="message-text">{message}</div>

                {!isUser && sources && sources.length > 0 && (
                    <div className="message-sources">
                        <button
                            className="sources-toggle"
                            onClick={() => setShowSources(!showSources)}
                        >
                            <span>Sources ({sources.length})</span>
                            {showSources ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {showSources && (
                            <div className="sources-list">
                                {sources.map((source, index) => (
                                    <div key={index} className="source-item">
                                        📄 {source}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
