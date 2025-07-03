import React, {useState} from "react";
import Modal from "@/components/common/Modal";
import {Notification} from "@/types/notification";

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const dummyNotifications: Notification[] = [
    {
        id: 1,
        title: "Welcome to Aithereum!",
        description: "Thank you for joining the platform. Explore Text‐to‐3D and more.",
        timestamp: "2 hours ago",
        isRead: false,
    },
    {
        id: 2,
        title: "New Feature: Text to Music",
        description: "You can now generate music from text. Give it a try!",
        timestamp: "1 day ago",
        isRead: true,
        actionLink: "http://aithereum.org/music",
    },
    {
        id: 3,
        title: "Weekly Newsletter",
        description: "Here’s our latest update and tips for getting the most out of Aithereum.",
        timestamp: "3 days ago",
        isRead: true,
    },
];

const NotificationModal: React.FC<NotificationModalProps> = ({isOpen, onClose}) => {
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    if (!isOpen) return null;

    const truncate = (text: string, max = 50) =>
        text.length > max ? text.slice(0, max) + "..." : text;

    return (
        <>
            <Modal onClose={onClose} title="Notification">
                <div className="max-h-72 overflow-y-auto space-y-4">
                    {dummyNotifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`rounded px-4 py-2 ${
                                notif.isRead ? "bg-primary-800" : "bg-secondary-700/20"
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    {!notif.isRead && <span className="text-accent-400 text-xs">●</span>}
                                    <h3 className={`text-white ${!notif.isRead ? "font-bold" : "font-medium"}`}>
                                        {notif.title}
                                    </h3>
                                </div>
                                <span className="text-sm text-secondary whitespace-nowrap">
                                    {notif.timestamp}
                                </span>
                            </div>
                            <p className="text-secondary-700 mb-2">{truncate(notif.description)}</p>
                            <div className="flex justify-end">
                                {notif.actionLink ? (
                                    <a
                                        href={notif.actionLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent-400 text-sm hover:text-white font-semibold"
                                    >
                                        View More
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => setSelectedNotification(notif)}
                                        className="text-accent-400 text-sm hover:text-white font-semibold"
                                    >
                                        Read More
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {dummyNotifications.length === 0 && (
                        <p className="text-center text-secondary">No notifications at this time.</p>
                    )}
                </div>
            </Modal>

            {selectedNotification && (
                <Modal
                    onClose={() => setSelectedNotification(null)}
                    title={selectedNotification.title}
                >
                    <p className="text-secondary-600 whitespace-pre-wrap">
                        {selectedNotification.description}
                    </p>
                </Modal>
            )}
        </>
    );
};

export default NotificationModal;
